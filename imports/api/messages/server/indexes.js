import createIndex from '../../create-index';
import Messages from '../collection';

createIndex(Messages, { owner: 1 });
