import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";
import Users from "../../api/users/";

// OBSERVATION: use the following mutation to set email to verified:
// db.users.update(
//   {_id: "yourUserId", "emails.address": "yourEmailGoesHere"},
//   {$set: {"emails.$.verified": true }}
// )

// Insert admin user
const users = [
  { email: "admin@admin.com", password: "123456", roles: ["admin"] },
  { email: "user@user.com", password: "123456", roles: ["normal"] }
];

users.forEach(({ email, password, roles }) => {
  const userExists = Users.collection.findOne({ "emails.address": email });

  // In case user already exists, do nothing
  if (userExists) {
    return;
  }

  // Otherwise, insert user and set his role to 'admin'
  const userId = Accounts.createUser({ email, password });
  Roles.addUsersToRoles(userId, roles);
});

import seeder from "@cleverbeagle/seeder";
import { Meteor } from "meteor/meteor";
import Jobs from "../../api/jobs/server/collection";
import Events from "../../api/events/server/collection";
import Organizations from "../../api/organizations/server/collection";
import Places from "../../api/places/server/collection";
import Tags from "../../api/tags/server/collection";
import { LANGUAGES_LIBRARIES, LOCATIONS } from "../../ui/constants";

const env = ["development"];

function image(folder) {
  return `/mock/${folder}/${Math.floor(Math.random() * 4)}.jpeg`;
}

function gender() {
  let value = Math.random() > 0.5 ? "Male" : "Famale";
  return {
    value: value,
    label: value
  };
}

function randomLookingFor() {
  const array = [
    "Co-Founders",
    "Competition Teammates",
    "Individuals to Mentor",
    "Mentorship",
    "Scientific Collaborations",
    "Individuals to Mentor",
    "Study Group Companions",
    "Tech Project Partners",
    "Co-Founders",
    "Competition Teammates",
    "Individuals to Mentor",
    "Mentorship",
    "Scientific Collaborations",
    "Individuals to Mentor",
    "Study Group Companions",
    "Tech Project Partners",
    "Academia",
    "Corporation",
    "Game",
    "StartUp",
    "industry",
    "DeepLearning",
    "ArtificialIntelligence",
    "Bioinformatic",
    "CriptoCrurrency",
    "BigData",
    "Artificial Intelligence",
    "CriptoCrurrency"
  ];
  const num = Math.floor(Math.random() * 8);
  let result = [];
  for (let i = 0; i <= num; i++)
    result.push(array[Math.floor(Math.random() * (array.length - 1))]);
  return Array.from(new Set(result));
}

function randomLookingForProfile() {
  const array = [
    "Academia",
    "Corporation",
    "Game",
    "StartUp",
    "industry",
    "DeepLearning",
    "ArtificialIntelligence",
    "Bioinformatic",
    "CriptoCrurrency",
    "BigData",
    "ArtificialIntelligence",
    "CriptoCrurrency"
  ];
  const num = Math.floor(Math.random() * 8);
  let result = [];
  for (let i = 0; i <= num; i++) {
    let str = array[Math.floor(Math.random() * (array.length - 1))];
    result.push({ label: str, value: str });
  }
  return Array.from(new Set(result));
}

function fakeSponsor(faker) {
  const num = Math.floor(Math.random() * 8);
  let result = [];
  for (let i = 0; i <= num; i++)
    result.push({
      email: faker.internet.email(),
      organization: faker.commerce.department(),
      logo: { imgSrc: image("events"), imgFile: {} }
    });
  return result;
}

const TagsSeed = () => ({
  collection: Tags,
  environments: env,
  modelCount: LANGUAGES_LIBRARIES.length,

  model(dataIndex, faker) {
    for (let i = 0; i < LANGUAGES_LIBRARIES.length; i++) {
      let skill = LANGUAGES_LIBRARIES[dataIndex];
      return {
        name: skill.label,
        label: skill.label,
        value: skill.value,
        categories:
          skill.categories && skill.categories.length > 0
            ? skill.categories
            : ["custom"],
        types: "languages",
        createdAt: new Date().toISOString,
        updatedAt: new Date().toISOString
      };
    }
  }
});

function getLocationFake(faker) {
  let location = LOCATIONS[Math.floor(Math.random() * (LOCATIONS.length - 1))];

  const address = {
    cityCountry: {
      city: faker.address.city(),
      country: faker.address.country(),
      entire: faker.address.city() + ", " + faker.address.country()
    }
  };
  return Object.assign(location, address);
}

const locationSeed = (owner, entityId) => ({
  collection: Places,
  environments: env,
  noLimit: true,
  modelCount: 1,
  model(dataIndex, faker) {
    return {
      owner: owner,
      entity: entityId,
      location: getLocationFake(faker)
    };
  }
});

const JobsSeed = userId => ({
  collection: Jobs,
  environments: env,
  noLimit: true,
  modelCount: 5,
  model(dataIndex, faker) {
    return {
      owner: userId,
      title: faker.commerce.department(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: faker.lorem.words(Math.floor(Math.random() * 10) + 5),
      aboutUsTeam: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
      candidateQuestion: faker.lorem.words(Math.floor(Math.random() * 3) + 3),
      equity: true,
      experience: {
        label: "Senior",
        value: "Senior"
      },
      image: image("jobs"),
      jobResponsibility: faker.lorem.words(Math.floor(Math.random() * 10) + 5),
      jobType: {
        value: "Full time",
        label: "Full time"
      },
      languages: Tags.aggregate([{ $sample: { size: 1 } }])._id,
      location: getLocationFake(faker),
      relocation: false,
      remote: true,
      salaryRange: {
        salary: { min: "500", max: "6000" },
        frequency: "Monthly"
      },
      statement: faker.lorem.words(Math.floor(Math.random() * 5) + 2),
      technologies: randomLookingFor().map(item => ({
        label: item,
        value: item,
        level: "experienced"
      })),
      visaSponsorship: false,
      workForUs: faker.lorem.words(Math.floor(Math.random() * 5) + 2),
      entity: "JOB",
      data(entityId) {
        return locationSeed(entityId, "JOB");
      }
    };
  }
});

const EventsSeed = userId => ({
  collection: Events,
  environments: env,
  noLimit: true,
  modelCount: 5,
  model(dataIndex, faker) {
    return {
      venueName: faker.company.companyName(),
      ticketType: { value: "Volunteer", label: "Volunteer" },
      eventType: {
        value: "Technical Workshop",
        label: "Technical Workshop"
      },
      organizer: faker.company.companyName(),
      phone: faker.phone.phoneNumber(),
      notes: faker.lorem.sentence(),
      category: randomLookingFor(),
      owner: userId,
      title: faker.commerce.department(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      image: image("events"),
      description: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
      from: "The type of owner (organization, communities or register user).",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      sponsors: fakeSponsor(faker),
      size: "100-150",
      entity: "EVENT",
      data(entityId) {
        return locationSeed(entityId, "EVENT");
      }
    };
  }
});

const OrganizationSeed = userId => ({
  collection: Organizations,
  environments: env,
  noLimit: true,
  modelCount: 10,
  model(dataIndex, faker) {
    return {
      info: {
        image: faker.image.avatar(),
        cover: image("user"),
        name: faker.company.companyName(),
        employees: { value: "1-10", label: "1-10" },
        description: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
        location: getLocationFake(faker)
      },
      social: {
        github: faker.internet.userName(),
        lkdin: faker.internet.userName(),
        fb: faker.internet.userName(),
        twter: faker.internet.userName(),
        website: faker.internet.url()
      },
      contact: {
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        full_name: faker.name.firstName()
      },
      services: {
        relocated: true,
        seeking: true,
        host_events: true
      },
      reason: {
        lang: [
          { label: "Agile", value: "Agile" },
          { label: "Arduino", value: "Arduino" },
          { label: "Ansible", value: "Ansible" }
        ],
        vision: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
        mission: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
        culture: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
        orgdefine: faker.lorem.words(Math.floor(Math.random() * 50) + 20),
        product: faker.lorem.words(Math.floor(Math.random() * 50) + 20)
      },
      industry: ["Aerospace & Defense", "Agricultural", "Culture"],
      owner: userId,
      data(entityId) {
        return locationSeed(entityId, "ORGANIZATION");
      }
    };
  }
});

seeder(Meteor.users, {
  environments: env,
  noLimit: true,
  data: [],
  modelCount: 6,
  model(index, faker) {
    const userCount = index + 1;
    const email = faker.internet.email();
    const name = faker.name.firstName();
    return {
      email,
      password: "password",
      profile: {
        name,
        personalInfo: {
          name,
          lastName: faker.name.lastName(),
          img: faker.image.avatar(),
          email,
          location: getLocationFake(faker),
          gender: gender(),
          website: faker.internet.url(),
          phoneNumber: faker.phone.phoneNumber(),
          cover: image("user")
        },
        aboutMe: {
          yourPassion: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
          exitingProblem: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
          steps: faker.lorem.words(Math.floor(Math.random() * 15) + 6),
          lockingFor: randomLookingForProfile(),
          description: faker.lorem.words(Math.floor(Math.random() * 15) + 6)
        }
      },
      roles: ["admin"],
      data(userId) {
        console.log(userCount % 4);
        switch (userCount % 4) {
          case 0:
            return EventsSeed(userId);
          case 1:
            return JobsSeed(userId);
          case 2:
            return OrganizationSeed(userId);
          case 3:
            return TagsSeed();
        }
      }
    };
  }
});
