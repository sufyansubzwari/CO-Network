import { Meteor } from "meteor/meteor";
import { assert, expect } from "chai";
import StubCollections from "meteor/hwillson:stub-collections";
import Bugs from "../index";
import Bug from "../server/collection";

if (Meteor.isServer) {
  describe("Bug Collection", () => {
    beforeEach(function() {
      StubCollections.stub(Bug);
    });
    it("should be exit Bug", async function() {
      const bug = {
        name: "Bug about",
        description: "Bug baout graphql",
        project_id: "F7vcmMoPtehxYD92m"
      };
      const bugId = await Bugs.collection.insert(bug);
      assert.isString(bugId);
      const bugInsert= await Bugs.collection.findOne({ name: "Bug about" });
      expect(bugInsert.name).to.be.equal("Bug about");
    });
  });
}
