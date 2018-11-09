import createIndex from '../../create-index';
import StripeCustomer from '../collection';

createIndex(StripeCustomer, { owner: 1 });
