// import { Meteor } from 'meteor/meteor';
// import { assert, expect } from 'chai';
// import StubCollections from 'meteor/hwillson:stub-collections';
// import Events from '../index';
//
//
// if (Meteor.isServer) {
//     describe('Events Collection', () => {
//         beforeEach(function() {
//             StubCollections.stub(Events);
//         });
//         it('should be exit events', async function() {
//             const data = { name: 'Events about', description: 'Events about graphQl', requirement_id: 'F7vcmMoPtehxYD92m' };
//             const id = await Events.insert(data);
//             assert.isString(id);
//             const collection = await Events.collection.findOne({ 'name': 'Events about' });
//             expect(collection.name).to.be.equal('Events about');
//         });
//     });
// }
//
