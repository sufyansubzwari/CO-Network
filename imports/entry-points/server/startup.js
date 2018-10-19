import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import CreateIndex from '../../api/create-index';
import Places from '../../api/places/server/collection';

Meteor.startup(() => {
  console.log('[server] startup');

  // Set html lang attribute
  WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));

  // Setup email provider
  const { protocol, username, password, server, port } = Meteor.settings.smtp;
  process.env.MAIL_URL = `${protocol}://${username}:${password}@${server}:${port}`;

  // Setup default users if any
  import './fixtures';
  import './databaseConstants';

  //creating indexes for Place Search
  CreateIndex(Places, {"location.location.coordinates": "2d"})

  // Run schema migrations if any.

  // Start cron-jobs if any
});
