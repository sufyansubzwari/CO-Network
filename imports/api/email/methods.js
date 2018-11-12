import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { SSR } from "meteor/meteorhacks:ssr";

Meteor.methods({
  sendEmailText(to, from, subject, text) {
    check([to, from, subject, text], [String]);

    this.unblock();
    Email.send({ to, from, subject, text });
  },

  sendEmailHtml(options) {

    try {
        const {to, from ,subject, htmlurl, data} = options;

        check([to, from, subject, htmlurl], [String]);

        SSR.compileTemplate("emailTemplate", Assets.getText(htmlurl));

        let html = SSR.render("emailTemplate", data);
        console.log("sending email with data", data);

        this.unblock();
        Email.send({to, from, subject, html: html});

    }catch (e){
        throw e
    }
  },

  sendEmailPayment(options) {

    try {
    const {to, from ,subject, data} = options;

    check([to, from, subject], [String]);

    SSR.compileTemplate(
      "emailTemplate",
      Assets.getText("email-templates/paymentEmail.html")
    );

    let html = SSR.render("emailTemplate", data);
    console.log("sending email with data", data);
    this.unblock();
    Email.send({ to: to, from: from, subject: subject, html: html });
    }
    catch (e){
        throw e
    }
  }
});
