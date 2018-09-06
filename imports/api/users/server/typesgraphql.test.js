// import { Meteor } from "meteor/meteor";
// import { mockServer } from "graphql-tools";
// import casual from "casual-browserify";
// import schema from "./types.graphql";
//
// if (Meteor.isServer) {
//   describe("User schema", () => {
//     const server = mockServer(schema, {
//       RootQuery: () => ({
//         user: (o, { id }) => ({ id })
//       }),
//       Email: () => ({
//         address: () => casual.address,
//         verified: () => casual.boolean
//       }),
//       Profile: () => ({
//         name: casual.name,
//         gender: "M",
//         avatar: casual.url
//       }),
//       Keys: () => ({
//         auth: casual.uuid,
//         p256dh: casual.random
//       }),
//       Subscription: () => ({
//         endpoint: casual.url,
//         keys: casual.random
//       }),
//       User: () => ({
//         _id: casual.uuid,
//         createdAt: casual.date((format = "YYYY-MM-DD")),
//         services: [casual.domain, casual.domain],
//         emails: [casual.email, casual.email],
//         profile: {
//           name: casual.name,
//           gender: "M",
//           avatar: casual.url
//         },
//         subscriptions: [
//           {
//             endpoint: casual.url,
//             keys: casual.random
//           }
//         ]
//       })
//     });
//     it("should be exit users", async () => {
//       const data = await server.query(`
//          query getAll {
//             user {
//               _id
//               emails{
//                 address
//               }
//               profile{
//                 name
//               }
//               subscriptions {
//                 endpoint
//               }
//             }
//           }`);
//       expect(data.data.user).to.have.property("_id");
//       expect(data.data.user).to.have.property("emails");
//       expect(data.data.user).to.have.property("profile");
//       expect(data.data.user).to.have.property("subscriptions");
//     });
//   });
// }
