import { Meteor } from 'meteor/meteor';
import { expect ,assert} from 'chai'
import StubCollections from 'meteor/hwillson:stub-collections';
import Sprint from './collection'
import Sprints from '../index';


if (Meteor.isServer) {
  describe('Requirement Collection', ()=> {
    beforeEach(function () {
      StubCollections.stub(Sprint);
    });
    it('should be exit user create', async function () {
      const sprintData= { project_id: 'nd7teCkf2SFTDbYxh',sprint_id: 'QYWLWPBmDpbf6YuNg', name: 'Graphql query'}
      const sprintInsert=await Sprint.insert(sprintData);
      assert.isString(sprintInsert)
      const sprint=await Sprints.collection.findOne({ 'name': 'Graphql query' });
      expect(sprint.name).to.be.equal("Graphql query");
    });

  });
}

