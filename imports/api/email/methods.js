import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { SSR } from 'meteor/meteorhacks:ssr';

Meteor.methods({
  sendEmailText(to, from, subject, text) {
    check([to, from, subject, text], [String]);

    this.unblock();
    Email.send({ to, from, subject, text });
  },

    sendEmailHtml(to, from, subject, html) {
        check([to, from, subject, html], [String]);
        this.unblock();
        Email.send({ to, from, subject, html });
    },

    sendEmailPayment(to, from, subject, data) {
        check([to, from, subject], [String]);

        SSR.compileTemplate('emailTemplate', Assets.getText('email-templates/paymentEmail.html'));

        let html = SSR.render('emailTemplate',data);
        console.log("sending email with data", data)
        this.unblock();
        Email.send({ to: to, from: from, subject: subject, html: html});
    }
});