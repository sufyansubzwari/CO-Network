const parseGoogleData = service => ({
  email: service.email,
  name: `${service.given_name} ${service.family_name}`,
  personalInfo: {
    name: service.given_name,
    lastName: service.family_name,
    img: service.picture,
    emailAddress: service.email,
    location: "",
    gender: "",
    website: "",
    phoneNumber: "",
    cover: ""
  },
  aboutMe: {
    yourPassion: "",
    exitingProblem: "",
    steps: "",
    lockingFor: [],
    description: ""
  }
});

const parseGithubData = profile => {
  let user = {
    email: profile.email ? profile.email : "",
    name: profile.name,
    personalInfo: {
      name: profile.name,
      img: profile.picture,
      emailAddress: "",
      location: "",
      gender: "",
      website: "",
      phoneNumber: "",
      cover: ""
    },
    aboutMe: {
      yourPassion: "",
      exitingProblem: "",
      steps: "",
      lockingFor: [],
      description: ""
    }
  };
  return user;
};

const parseFacebookData = service => ({
  email: service.email,
  name: `${service.first_name} ${service.last_name}`,
  personalInfo: {
    name: service.first_name,
    lastName: service.last_name,
    img: service.picture,
    emailAddress: service.email,
    location: "",
    gender: "",
    website: "",
    phoneNumber: "",
    cover: ""
  },
  aboutMe: {
    yourPassion: "",
    exitingProblem: "",
    steps: "",
    lockingFor: [],
    description: ""
  }
});

const parseTwitterData = (profile, service) => {
  const name = profile.name.split(" ");
  return {
    email: profile.email ? profile.email : "",
    name: profile.name,
    createdAt: profile.createdDate || Date.now(),
    info: {
      name: name[0],
      lastName: name[1],
      nickname: profile.screen_name || profile.nickname,
      image: profile.picture,
      email: profile.email || "",
      identities: profile.identities,
      lastIp: profile.lastIp,
      location: "",
      gender: "",
      website: "",
      phone: "",
      cover: ""
    },
    aboutMe: {
      yourPassion: "",
      exitingProblem: "",
      steps: "",
      lockingFor: [],
      description: ""
    }
  };
};

const getDataForService = (options, services) => {
  if (services.facebook) return parseFacebookData(options);
  if (services.github) return parseGithubData(options);
  if (services["google-oauth2"]) return parseGoogleData(options);
  if (services.twitter) return parseTwitterData(options);
  return null;
};

export default (options, user) => {
  const isOAuth = !options.password;
  const serviceData = isOAuth
    ? getDataForService(options, user.services)
    : null;
  return isOAuth ? serviceData : null;
};
