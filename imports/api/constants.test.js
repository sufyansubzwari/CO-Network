import { Meteor } from 'meteor/meteor';
import { expect ,assert } from 'chai';
import constants from './constants'


if (Meteor.isServer) {
  describe('Constant', function testSuite() {
    it('check by constants defined', function () {
      expect( constants).to.have.property('SITE_BRAND')
      expect( constants).to.have.property('DOMAIN_NAME')
      expect( constants).to.have.property('SUPPORT_EMAIL')
      expect( constants).to.have.property('SUPPORT_EMAIL')
      expect( constants).to.have.property('SITE_TWITTER')
      expect( constants).to.have.property('AUTH_SERVICES')
      expect( constants).to.have.property('ALL_ROLES')
      expect( constants).to.have.property('ROUTES')
    });
  });
}

