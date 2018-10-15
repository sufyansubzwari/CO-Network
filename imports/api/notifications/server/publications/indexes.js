import createIndex from '../../../create-index';
import Notifications from '../../collection';

createIndex(Notifications, { owner: 1 });
