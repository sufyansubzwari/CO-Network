import { toast } from 'react-toastify';

class NotificationToast {

  notify = (type, message) => {
  /** notifications types:
   * success, error, warn, info
   */
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}

export default new NotificationToast();