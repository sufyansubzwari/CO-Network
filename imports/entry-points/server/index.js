// Import your server-side configs
import "./apollo-server";
import "./configs";
import "./startup";

// Import methods
import "../../api/users/methods";
import "../../api/utils/server/methods";
import "../../api/utils/server/filesToS3";

// Import all your server-side collections
// import '../../api/installers/collection';
// import '../../api/customers/collection';

// Import cronjobs
// import './cron-jobs/<cron-job-name>';
