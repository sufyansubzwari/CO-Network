import { Meteor } from 'meteor/meteor';
import { expect ,assert} from 'chai'
import StubCollections from 'meteor/hwillson:stub-collections';
import Sprint from './collection'
import Sprints from '../index';


if (Meteor.isServer) {
  describe('Sprint Collection', ()=> {
    beforeEach(function () {
      StubCollections.stub(Sprint);
    });
    it('should be exit user create', async function () {
      const sprintData= { project_id: 'nd7teCkf2SFTDbYxh', name: 'Graphql'}
      const sprintInsert=await Sprint.insert(sprintData);
      assert.isString(sprintInsert)
      const sprint=await Sprints.collection.findOne({ 'name': 'Graphql' });
      expect(sprint.name).to.be.equal("Graphql");
      expect(sprint.description).to.have.lengthOf.above(2);
    });

  });
}

