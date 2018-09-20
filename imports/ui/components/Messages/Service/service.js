import { Meteor } from "meteor/meteor";

export const insertMessage = (message, callBack) => {
  if (checkLoggedUser()) {
    Meteor.call("messages.insert", message, error => {
      if (error) {
        return callBack(error);
      } else {
        return callBack("success");
      }
    });
  }
};

function checkLoggedUser() {
  // if(!Meteor.userId()){
  //   // Bert.alert("Please Log in", 'danger')
  //   return false;
  // }
  return true;
}
