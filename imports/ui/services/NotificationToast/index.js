import React from "react";
import { toast } from "react-toastify";
import {
  CloseButton,
  Toast as CustomNotification
} from "./components/customNotification";
import "./components/style.css";

class NotificationToast {
  notify = (type, title, message, iconType) => {
    /** notifications types:
     * success, error, warn, info
     */
    const toastId = toast(
      <CustomNotification {...{ type, title, message, iconType }} />
    );
    toast.update(toastId, {
      render: <CustomNotification {...{ type, title, message, iconType }} />,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      className: "notification-container-custom",
      closeButton: <CloseButton iconType={"close"} />
    });
  };
  success = (message, title) => {
    this.notify("success", title, message);
  };
  error = (message, title) => {
    this.notify("error", title, message);
  };
  warn = (message, title) => {
    this.notify("warn", title, message);
  };
  info = (message, title) => {
    this.notify("info", title, message);
  };
}

export default new NotificationToast();
