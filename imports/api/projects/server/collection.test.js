import { Meteor } from 'meteor/meteor';
import { expect ,assert} from 'chai'
import StubCollections from 'meteor/hwillson:stub-collections';
import Project from './collection'
import Projects from '../index';


if (Meteor.isServer) {
  describe('Project Collection', ()=> {
    beforeEach(function () {
      StubCollections.stub(Project);
    });
    it('should be exit user create', async function () {
      const projectData= { name: 'tek-task', description: 'Project management platform'}
      const projectInsert=await Project.insert(projectData);
      assert.isString(projectInsert)
      const project=await Projects.collection.findOne({ 'name': 'tek-task' });
      expect(project.name).to.be.equal("tek-task");
      expect(project.description).to.have.lengthOf.above(2);
    });

  });
}

