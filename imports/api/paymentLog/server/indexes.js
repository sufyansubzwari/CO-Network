import createIndex from '../../create-index';
import PaymentLog from '../collection';

createIndex(PaymentLog, { owner: 1 });
