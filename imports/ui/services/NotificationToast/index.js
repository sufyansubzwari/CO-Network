import React from "react";
import { toast } from "react-toastify";
import {
  CloseButton,
  Toast as CustomNotification
} from "./components/customNotification";
import './components/style.css';

class NotificationToast {
  notify = (type, message, iconType) => {
    /** notifications types:
     * success, error, warn, info
     */
    const toastId = toast(<CustomNotification {...{type, message, iconType }} />);
    toast.update(toastId, {
      render: <CustomNotification {...{type, message, iconType }} />,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      className: "notification-container-custom",
      closeButton: <CloseButton iconType={"close"} />
    });
    // toast(message, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   closeButton: <CloseButton iconType={iconType} />
    // });
  };
}

export default new NotificationToast();
