import { Meteor } from "meteor/meteor";

class Email {
  constructor() {}

  sendEmailText(from, to, subject, text) {
    Meteor.call("sendEmailText", to, from, subject, text);
  }
  sendEmailHtml(from, to, subject, htmlurl, data) {
    Meteor.call("sendEmailHtml", to, from, subject, htmlurl, data);
  }
  sendEmailPayment(from, to, subject, data) {
    Meteor.call("sendEmailPayment", to, from, subject, data);
  }
}

export default new Email();
