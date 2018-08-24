import { Meteor } from 'meteor/meteor';
import { assert, expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import Task from './collection';
import Tasks from '../index';


if (Meteor.isServer) {
  describe('Task Collection', () => {
    beforeEach(function() {
      StubCollections.stub(Sprint);
    });
    it('should be exit task', async function() {
      const taskData = { name: 'Task about', description: 'task baout graphql', requirement_id: 'F7vcmMoPtehxYD92m' };
      const taskId = await Tasks.insert(taskData);
      assert.isString(taskId);
      const task = await Tasks.collection.findOne({ 'name': 'Task about' });
      expect(task.name).to.be.equal('Task about');
    });

  });
}

