import {Meteor} from "meteor/meteor";
import {mockServer} from "graphql-tools";
import casual from "casual-browserify";
import schema from "./types.graphql";

if (Meteor.isServer) {
  describe("Events schema", () => {
    const server = mockServer(schema, {
      RootQuery: () => ({
        searchEvent: (events = {}) => [Events],
        events: () => [Events],
        event: (o, {id}) => Events
      }),
      Project: () => ({
        _id: casual.uuid,
        title: casual.title,
        description: casual.words(8),
        startDate: casual.date((format = "YYYY-MM-DD")),
        endDate: casual.date((format = "YYYY-MM-DD")),
        owner: casual.uuid
      }),
      Date: () => casual.date((format = "YYYY-MM-DD"))
    });
    it("should be returns events", async () => {
      const data = await server.query(`
         query getAll { 
            events {
              _id
              title
            }
          }`);
      expect(data.data.user).to.have.property("_id");
      expect(data.data.user).to.have.property("title");
    });
  });
}
