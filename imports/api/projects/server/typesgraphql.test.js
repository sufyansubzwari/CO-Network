import { Meteor } from "meteor/meteor";
import { mockServer } from "graphql-tools";
import casual from "casual-browserify";
import schema from "./types.graphql";

if (Meteor.isServer) {
  describe("Project schema", () => {
    const server = mockServer(schema, {
      RootQuery: () => ({
        searchProject: (project = {}) => [Project],
        projects: () => [Project],
        project: (o, { id }) => Project
      }),
      Project: () => ({
        _id: casual.uuid,
        name: casual.name,
        description: casual.words(8),
        startDate: casual.casual.date((format = "YYYY-MM-DD")),
        endDate: casual.date((format = "YYYY-MM-DD")),
        owner: casual.uuid
      }),
      Date: () => casual.date((format = "YYYY-MM-DD"))
    });
    it("should be returns projects", async () => {
      const data = await server.query(`
         query getAll { 
            project {
              _id
              name
            }
          }`);
      expect(data.data.user).to.have.property("_id");
      expect(data.data.user).to.have.property("name");
    });
  });
}
