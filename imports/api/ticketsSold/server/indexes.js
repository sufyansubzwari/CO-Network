import createIndex from '../../create-index';
import TicketsSold from '../collection';

createIndex(TicketsSold, { owner: 1 });
