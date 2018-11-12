import { Meteor } from "meteor/meteor";

class Email {
  constructor() {}

  sendEmailText(from, to, subject, text) {
    Meteor.call("sendEmailText", to, from, subject, text);
  }
  sendEmailHtml(options, callback) {
      // options{from, to, subject, htmlurl, data}
      //params to, from, subject, htmlurl, data

      const {from, to, subject, htmlurl, data} = options;
      const options2 = {to, from, subject, htmlurl, data};

    Meteor.call("sendEmailHtml", options2, (error, result) => { callback(error, result) });
  }
  sendEmailPayment(options, callback) {
    const {from, to, subject, data} = options;
    const options2 = {to, from, subject, data};

    Meteor.call("sendEmailPayment", options2, (error, result) => { callback(error, result) });
  }
}

export default new Email();
