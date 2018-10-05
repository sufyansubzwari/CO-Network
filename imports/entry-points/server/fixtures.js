// import { Roles } from "meteor/alanning:roles";
// import seeder from "@cleverbeagle/seeder";
// import { Meteor } from "meteor/meteor";
// import Jobs from "../../api/jobs/server/collection";
// import Events from "../../api/events/server/collection";
// import Organizations from "../../api/organizations/server/collection";
// import Places from "../../api/places/server/collection";
// import Tags from "../../api/tags/server/collection";
// import { LANGUAGES_LIBRARIES, LOCATIONS } from "../../ui/constants";
//
// const env = ["development"];
//
// function image(folder) {
//   return `/mock/${folder}/${Math.floor(Math.random() * 4)}.jpeg`;
// }
//
// function gender() {
//   let value = Math.random() > 0.5 ? "Male" : "Famale";
//   return {
//     value: value,
//     label: value
//   };
// }
//
// function randomLookingFor() {
//   const array = [
//     "Co-Founders",
//     "Competition Teammates",
//     "Individuals to Mentor",
//     "Mentorship",
//     "Scientific Collaborations",
//     "Individuals to Mentor",
//     "Study Group Companions",
//     "Tech Project Partners",
//     "Co-Founders",
//     "Competition Teammates",
//     "Individuals to Mentor",
//     "Mentorship",
//     "Scientific Collaborations",
//     "Individuals to Mentor",
//     "Study Group Companions",
//     "Tech Project Partners",
//     "Academia",
//     "Corporation",
//     "Game",
//     "StartUp",
//     "industry",
//     "DeepLearning",
//     "ArtificialIntelligence",
//     "Bioinformatic",
//     "CriptoCrurrency",
//     "BigData",
//     "Artificial Intelligence",
//     "CriptoCrurrency"
//   ];
//   const num = Math.floor(Math.random() * 8);
//   let result = [];
//   for (let i = 0; i <= num; i++)
//     result.push(array[Math.floor(Math.random() * (array.length - 1))]);
//   return Array.from(new Set(result));
// }
//
// function randomLookingForProfile() {
//   const array = [
//     "Academia",
//     "Corporation",
//     "Game",
//     "StartUp",
//     "industry",
//     "DeepLearning",
//     "ArtificialIntelligence",
//     "Bioinformatic",
//     "CriptoCrurrency",
//     "BigData",
//     "ArtificialIntelligence",
//     "CriptoCrurrency"
//   ];
//   const num = Math.floor(Math.random() * 8);
//   let result = [];
//   for (let i = 0; i <= num; i++) {
//     let str = array[Math.floor(Math.random() * (array.length - 1))];
//     result.push({ label: str, value: str });
//   }
//   return Array.from(new Set(result));
// }
//
// function fakeSponsor(faker) {
//   const num = Math.floor(Math.random() * 8);
//   let result = [];
//   for (let i = 0; i <= num; i++)
//     result.push({
//       email: faker.internet.email(),
//       organization: faker.commerce.department(),
//       logo: { imgSrc: image("events"), imgFile: {} }
//     });
//   return result;
// }
//
// const TagsSeed = type => ({
//   collection: Tags,
//   environments: env,
//   modelCount: LANGUAGES_LIBRARIES.length,
//
//   model(dataIndex, faker) {
//     for (let i = 0; i < LANGUAGES_LIBRARIES.length; i++) {
//       let skill = LANGUAGES_LIBRARIES[dataIndex];
//       return {
//         name: skill.label,
//         label: skill.label,
//         value: skill.value,
//         categories:
//           skill.categories && skill.categories.length > 0
//             ? skill.categories
//             : ["custom"],
//         types: type,
//         createdAt: new Date().toISOString,
//         updatedAt: new Date().toISOString
//       };
//     }
//   }
// });
//
// function getLocationFake(faker) {
//   let location = LOCATIONS[Math.floor(Math.random() * (LOCATIONS.length - 1))];
//
//   const address = {
//     cityCountry: {
//       city: faker.address.city(),
//       country: faker.address.country(),
//       entire: faker.address.city() + ", " + faker.address.country()
//     }
//   };
//   return Object.assign(location, address);
// }
//
// const locationSeed = (owner, entityId) => ({
//   collection: Places,
//   environments: env,
//   noLimit: true,
//   modelCount: 1,
//   model(dataIndex, faker) {
//     return {
//       owner: owner,
//       entity: entityId,
//       location: getLocationFake(faker)
//     };
//   }
// });
//
// const JobsSeed = userId => ({
//   collection: Jobs,
//   environments: env,
//   noLimit: true,
//   modelCount: 2,
//   model(dataIndex, faker) {
//     return {
//       owner: userId,
//       title: faker.commerce.department(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       description: faker.lorem.words(Math.floor(Math.random() * 10) + 5),
//       aboutUsTeam: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
//       candidateQuestions: faker.lorem.words(Math.floor(Math.random() * 3) + 3),
//       equity: true,
//       jobExperience: [
//         {
//           label: "Senior",
//           value: "Senior"
//         }
//       ],
//       image: image("jobs"),
//       jobResponsibility: faker.lorem.words(Math.floor(Math.random() * 10) + 5),
//       jobType: [
//         {
//           value: "Full time",
//           label: "Full time"
//         }
//       ],
//       languages: Tags.aggregate([{ $sample: { size: 1 } }])._id,
//       positionTags: Tags.aggregate([{ $sample: { size: 1 } }])._id,
//       location: getLocationFake(faker),
//       relocation: false,
//       remote: true,
//       salaryRange: {
//         min: "500",
//         max: "6000"
//       },
//       // statement: faker.lorem.words(Math.floor(Math.random() * 5) + 2),
//       // technologies: randomLookingFor().map(item => ({
//       //   label: item,
//       //   value: item,
//       //   level: "experienced"
//       // })),
//       // visaSponsorship: false,
//       // workForUs: faker.lorem.words(Math.floor(Math.random() * 5) + 2),
//       entity: "JOB",
//       data(entityId) {
//         return locationSeed(entityId, "JOB");
//       }
//     };
//   }
// });
//
// const EventsSeed = userId => ({
//   collection: Events,
//   environments: env,
//   noLimit: true,
//   modelCount: 2,
//   model(dataIndex, faker) {
//     return {
//       venueName: faker.company.companyName(),
//       venueEmail: faker.internet.email(),
//       tickets: [
//         { name: "free", description: "free", type: "free", available: 5 },
//         {
//           name: "paid",
//           description: "paid",
//           type: "paid",
//           available: 5,
//           min: 10,
//           max: 20
//         }
//       ],
//       attenders: {
//         min: 10,
//         max: 20
//       },
//       organizer: faker.company.companyName(),
//       phone: faker.phone.phoneNumber(),
//       notes: faker.lorem.sentence(),
//       // category: randomLookingFor(),
//       owner: userId,
//       title: faker.commerce.department(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       image: image("events"),
//       description: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
//       from: "The type of owner (organization, communities or register user).",
//       startDate: new Date().toISOString(),
//       endDate: new Date().toISOString(),
//       // sponsors: fakeSponsor(faker),
//       entity: "EVENT",
//       data(entityId) {
//         return locationSeed(entityId, "EVENT");
//       }
//     };
//   }
// });
//
// const OrganizationSeed = userId => ({
//   collection: Organizations,
//   environments: env,
//   noLimit: true,
//   modelCount: 2,
//   model(dataIndex, faker) {
//     return {
//       image: image("events"),
//       cover: image("user"),
//       name: faker.company.companyName(),
//       description: Tags.aggregate([{ $sample: { size: 1 } }])._id,
//       website: faker.internet.url(),
//       location: getLocationFake(faker),
//       social: {
//         github: faker.internet.userName(),
//         linkedin: faker.internet.userName(),
//         facebook: faker.internet.userName(),
//         twitter: faker.internet.userName(),
//         google: faker.internet.userName()
//       },
//       contact: {
//         email: faker.internet.email(),
//         phone: faker.phone.phoneNumber()
//       },
//       services: {
//         relocated: true,
//         seeking: true,
//         host_events: true
//       },
//       reason: {
//         vision: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
//         bio: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
//         // culture: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
//         orgDefine: faker.lorem.words(Math.floor(Math.random() * 50) + 20)
//         // product: faker.lorem.words(Math.floor(Math.random() * 50) + 20)
//       },
//       tech: {
//         stack: Tags.aggregate([{ $sample: { size: 1 } }])._id,
//         salaryRange: {
//           min: 500,
//           max: 1000
//         },
//         jobType: [{ label: "Full Time" }],
//         industry: ["Energy & Utilities"]
//       },
//       owner: userId,
//       data(entityId) {
//         return locationSeed(entityId, "ORGANIZATION");
//       }
//     };
//   }
// });
//
// seeder(Meteor.users, {
//   environments: env,
//   noLimit: true,
//   data: [],
//   modelCount: 30,
//   model(index, faker) {
//     const userCount = index + 1;
//     const email = faker.internet.email();
//     const name = faker.name.firstName();
//     return {
//       email,
//       password: "password",
//       profile: {
//         name,
//         isSignUp: true,
//         lastName: faker.name.lastName(),
//         image: faker.image.avatar(),
//         email,
//         location: getLocationFake(faker),
//         gender: gender(),
//         website: faker.internet.url(),
//         phoneNumber: faker.phone.phoneNumber(),
//         cover: image("user"),
//         aboutMe: {
//           yourPassion: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
//           exitingProblem: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
//           steps: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
//           lockingFor: randomLookingForProfile(),
//           description: faker.lorem.words(Math.floor(Math.random() * 15) + 6)
//         }
//       },
//       roles: ["normal"],
//       data(userId) {
//         switch (userCount % 4) {
//           case 0:
//             return EventsSeed(userId);
//           case 1:
//             return JobsSeed(userId);
//           case 2:
//             return OrganizationSeed(userId);
//           case 3:
//             return TagsSeed();
//         }
//       }
//     };
//   }
// });
