import { WebAuth, Management } from "auth0-js/dist/auth0";
import { Meteor } from "meteor/meteor";
import react from "react";
import Axios from "axios";
import { userQuery } from "../../apollo-client/user";
import { Accounts } from "meteor/accounts-base";

class Authorization extends react.Component {
  constructor() {
    super();
    this.settings = Meteor.settings.public.auth0;
    this.auth0 = new WebAuth({
      domain: this.settings.domain,
      clientID: this.settings.clientID,
      redirectUri: this.settings.redirectUri + "callback",
      audience: `https://${this.settings.domain}/api/v2/`,
      scope:
        "read:current_user  update:current_user_identities delete:current_user_metadata delete:current_user_device_credentials offline_access",
      responseType: "token id_token"
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.loginMeteor = this.loginMeteor.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(service, callback) {
    localStorage.setItem("currentService", service);
    this.callback = callback;
    this.auth0.popup.authorize(
      {
        nonce: "login",
        connection: service
      },
      (err, authResult) => {
        if (!err && authResult) this.setSession(authResult);
      }
    );
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  renewToken() {
    let _this = this;
    debugger;
    this.auth0.checkSession({}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result) _this.setSession(result);
      }
    });
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    const delay = expiresAt - Date.now();
    let self = this;
    if (delay > 0) {
      global.tokenRenewalTimeout = setTimeout(function() {
        self.renewToken();
      }, delay);
    }
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    this.auth0.access_token = authResult.accessToken;
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("user_id", authResult.idTokenPayload.sub);
    this.authManage = new Management({
      domain: this.settings.domain,
      token: localStorage.access_token
    });
    this.scheduleRenewal();
    this.getProfile(this.loginMeteor);
  }

  logout(props, callback) {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    callback ? callback() : null;
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  loginMeteor(profile) {
    if (profile) {
      this.userProfile = profile;
      profile.expireIn = localStorage.expires_at;
      const service = localStorage.getItem("currentService");
      // insert user from Auth0
      Meteor.call("users.insertUserAuth0", profile, service, (err, result) => {
        if (!err) {
          Meteor.loginWithToken(
            result.token,
            () => this.callback && this.callback({ error: null, user: result })
          );
        } else {
          this.callback && this.callback({ error: err });
        }
      });
    }
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    let _this = this;
    this.authManage.getUser(localStorage.user_id, (err, profile) => {
      _this.profile = profile;
      if (!err) cb(profile);
      // todo: alert for error
    });
  }

  getNewToken() {
    Axios.post(`https://${this.settings.domain}/oauth/token`, {
      headers: {
        "content-type": "application/json"
      },
      processData: false,
      data: {
        grant_type: "client_credentials",
        client_id: this.settings.clientID,
        client_secret:
          "0MrD8Jx8sdIz2uPVrikY6bDAhwDQFi90OHHUghonMvlZIpRHosC_XYwD7I5MAgsw",
        audience: `https://${this.settings.domain}/api/v2/`
      }
    }).then(res => {
      debugger;
      localStorage.setItem("access_token", res.accessToken);
    });
  }

  initLink(service) {
    if (!this.linkAuth) this.linkAuth = this.getAuthForLink();
    let _this = this;
    this.linkAuth.popup.authorize(
      {
        connection: service
      },
      (error, auth) => {
        if (!error) _this.linkAccountCallback(auth, service);
      }
    );
  }

  getAuthForLink() {
    this.auth0Link = new WebAuth({
      domain: this.settings.domain,
      clientID: this.settings.clientID,
      redirectUri: this.settings.redirectUri + "link",
      audience: `https://${this.settings.domain}/userinfo`,
      scope: "openid profile email update:current_user_identities",
      responseType: "token id_token"
    });
    this.authManage = new Management({
      domain: this.settings.domain,
      token: localStorage.access_token
    });
    return this.auth0Link;
  }

  linkAccountCallback(authResult, service) {
    localStorage.setItem(service, authResult.idTokenPayload.sub);
    this.linkAccount(authResult.idToken);
  }

  linkAccount(secondaryIdToken) {
    const primaryAccessToken = localStorage.getItem("id_token");
    const primaryUserId = localStorage.getItem("user_id");
    let _this = this;
    this.authManage.linkUser(primaryUserId, secondaryIdToken, error => {
      if (error) {
        // todo: alert for error
      } else
        _this.getProfile(profile => {
          let prof = Meteor.user();
          prof = Object.assign(prof.profile, profile);
          // todo: update the profile
          // UpdUserProfile(prof);
        });
    });
  }

  unlinkAccount(service) {
    const userData = localStorage.getItem(service);
    let secondary_user = null;
    if (userData) secondary_user = userData.split("|")[1];
    let _this = this;

    if (!this.authManage) this.getAuthForLink();

    if (!this.isAuthenticated()) {
      this.renewToken();
    } else {
      if (secondary_user)
        Axios.delete(
          `https://${this.settings.domain}/api/v2/users/${
            localStorage.user_id
          }/identities/${service}/${secondary_user}`,
          {
            headers: { authorization: "Bearer " + localStorage.access_token }
          }
        ).then(res => {
          _this.getProfile(profile => {
            let prof = Meteor.user();
            prof = Object.assign(prof.profile, profile);
            // todo: update the profile
            // UpdUserProfile(prof);
          });
        });
    }
  }
}
export default new Authorization();
