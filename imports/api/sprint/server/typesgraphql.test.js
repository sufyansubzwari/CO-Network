import { Meteor } from "meteor/meteor";
import { mockServer } from "graphql-tools";
import casual from "casual-browserify";
import schema from "./types.graphql";

if (Meteor.isServer) {
  describe("Sprint schema", () => {
    const server = mockServer(schema, {
      RootQuery: () => ({
        searchSprint: (project = {}) => [Sprint],
        sprints: () => [Sprint],
        sprint: (o, { id }) => Sprint
      }),
      Sprint: () => ({
        _id: casual.uuid,
        name: casual.name,
        startDate: casual.casual.date((format = "YYYY-MM-DD")),
        endDate: casual.date((format = "YYYY-MM-DD")),
        project_id: casual.uuid
      }),
      Date: () => casual.date((format = "YYYY-MM-DD"))
    });
    it("should be returns projects", async () => {
      const data = await server.query(`
         query getAll { 
            sprints {
              _id
              name
            }
          }`);
      expect(data.data.user).to.have.property("_id");
      expect(data.data.user).to.have.property("name");
    });
  });
}
