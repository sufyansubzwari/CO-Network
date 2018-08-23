import { Meteor } from 'meteor/meteor';
import { expect ,assert} from 'chai'
import StubCollections from 'meteor/hwillson:stub-collections';
import User from './collection'
import Users from '../index';


if (Meteor.isServer) {
  describe('User Collection', ()=> {
    beforeEach(function () {
      StubCollections.stub(User);
    });
    it('should be exit user create', async function () {
      const user= { email: 'admin@admin.com', password: '123456', roles: ['admin'] }
      const userInsert=await User.insert(user);
      assert.isString(userInsert)
      const userCreated=await Users.collection.findOne({ 'email': 'admin@admin.com' });
      console.log("create",userCreated)
      expect(userCreated.email).to.be.equal("admin@admin.com");
      expect(userCreated.roles).to.have.lengthOf(1);
    });

  });
}

