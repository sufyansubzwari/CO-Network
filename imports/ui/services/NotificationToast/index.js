import { toast } from 'react-toastify';

class NotificationToast {

  notify = (type, message) => {

    toast.success(`Success! ${message}`, {
      position: toast.POSITION.TOP_RIGHT
    });

    toast.error(`Error! ${message}`, {
      position: toast.POSITION.TOP_RIGHT
    });

    toast.warn(`Warning!  ${message}`, {
      position: toast.POSITION.TOP_RIGHT
    });

    toast.info(`Info! ${message}`, {
      position: toast.POSITION.TOP_RIGHT
    });

    // toast("Custom Style Notification with css class!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   className: 'foo-bar'
    // });
  }
}

export default new NotificationToast();