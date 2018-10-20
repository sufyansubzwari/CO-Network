import {WebAuth, Management} from "auth0-js/dist/auth0";
import {Meteor} from "meteor/meteor";
import react from "react";
import Axios from "axios";


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
        this.loginOrganization = this.loginOrganization.bind(this);
    }

    login(service, callback) {
        localStorage.setItem("currentService", service);
        this.callback = callback;
        console.log("in real login ",service);
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

    loginOrganization(service, callback) {
        // localStorage.setItem("currentService", service);
        // this.callback = callback;
        this.auth0.popup.authorize(
            {
                nonce: "login",
                connection: service
            },
            (err, authResult) => {
                this.authManage = new Management({
                    domain: this.settings.domain,
                    token: authResult.accessToken
                });
                if (!err && authResult) this.getOrganizationProfile(authResult.idTokenPayload.sub,callback);
            }
        );
    }

    getOrganizationProfile(user_id,cb) {
        this.authManage.getUser(user_id, (err, profile) => {
            this.profile = profile;
            if (!err) cb(profile);
            else {
                // todo: alert for error
            }
        });
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
        this.auth0.checkSession({}, function (err, result) {
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
            global.tokenRenewalTimeout = setTimeout(function () {
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
            const userService = profile.user_id.split('|')[0];

            // insert user from Auth0
            Meteor.call("users.insertUserAuth0", profile, userService, (err, result) => {
                if (!err) {
                    Meteor.loginWithToken(
                        result.token,
                        () => this.callback && this.callback({error: null, user: result})
                    );
                } else {
                    this.callback && this.callback({error: err});
                }
            });
        }
    }

    getProfile(cb) {
        this.authManage.getUser(localStorage.user_id, (err, profile) => {
            this.profile = profile;
            if (!err) cb(profile);
            else {
                // todo: alert for error
            }
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

    initLink(service, callback) {
        if (!this.linkAuth) this.linkAuth = this.getAuthForLink();
        this.linkAuth.popup.authorize({connection: service}, (error, auth) => {
            if (!error) this.linkAccountCallback(auth, service, callback);
        });
    }

    async linkAccountCallback(authResult, service, callback) {
        localStorage.setItem(service, authResult.idTokenPayload.sub);
        //Verify if account exist in the system
        const exist = await this.verifyUserExist(authResult.idTokenPayload.sub);
        if (exist) {
            //Todo: return error
        } else this.linkAccount(authResult.idToken, callback);
    }

    async verifyUserExist(idToken) {
        return await new Promise((resolve, reject) =>
            Meteor.call("users.findUser", idToken, (error, result) => {
                if (error) return reject(error);
                resolve(result.length > 0);
            })
        );
    }

    linkAccount(secondaryIdToken, callback) {
        const primaryUserId = localStorage.getItem("user_id");
        this.authManage.linkUser(primaryUserId, secondaryIdToken, error => {
            if (error) {
                // todo: alert for error
            } else
                this.getProfile(profile => {
                    let prof = Meteor.user();
                    prof = Object.assign(prof.profile, profile);
                    callback && callback(Meteor.userId(), prof);
                });
        });
    }

    unlinkAccount(service, serviceData, callback) {
        if (!this.authManage) this.getAuthForLink();
        if (!this.isAuthenticated()) {
            this.renewToken();
        } else {
            const serviceId = serviceData ? serviceData.user_id : null;
            if (serviceId)
                Axios.delete(
                    `https://${this.settings.domain}/api/v2/users/${
                        localStorage.user_id
                        }/identities/${service}/${serviceId}`,
                    {
                        headers: {authorization: "Bearer " + localStorage.access_token}
                    }
                ).then(res => {
                    this.getProfile(profile => {
                        let prof = Meteor.user();
                        prof = Object.assign(prof.profile, profile);
                        callback && callback(Meteor.userId(), prof);
                    });
                });
        }
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
}

export default new Authorization();
