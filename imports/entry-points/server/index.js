// Import your server-side configs
import "./apollo-server";
import "./configs";
import "./startup";
import "./uploader";
import "./uploader/croper-image";

// Import methods
import "../../api/users/methods";
import "../../api/email/methods";

// Import Messages methods and subscription
import "../../api/messages/server/indexes";
import "../../api/messages/server/publications";
import "../../api/messages/methods";

// Import Notifications methods and subscription
import "../../api/notifications/server/publications/indexes";
import "../../api/notifications/server/publications/publications";

// Import Stripe and Payment methods
import "../../api/paymentLog/server/indexes";
import "../../api/paymentLog/methods";
import "../../api/stripeCustomer/server/indexes";
import "../../api/stripeCustomer/methods";
import "../../api/ticketsSold/server/indexes";
import "../../api/ticketsSold/methods";

// Import all your server-side collections
// import '../../api/installers/collection';
// import '../../api/customers/collection';

// Import cronjobs
// import './cron-jobs/<cron-job-name>';
