const aboutMe = {
  yourPassion: "",
  exitingProblem: "",
  steps: "",
  lockingFor: [],
  description: ""
};

const parseGoogleData = service => ({
  email: service.email,
  name: `${service.given_name} ${service.family_name}`,
  createdAt: service.createdDate || Date.now(),
  info: {
    name: service.given_name,
    lastName: service.family_name,
    loginCount: service.logins_count || 0,
    img: service.picture,
    email: service.email,
    location: "",
    gender: "",
    website: "",
    phone: "",
    cover: ""
  },
  aboutMe: aboutMe
});

const parseGithubData = profile => {
  const name = profile.name.split(" ");
  return {
    email: profile.email ? profile.email : "",
    name: profile.name,
    createdAt: profile.createdDate || Date.now(),
    info: {
      name: name[0],
      loginCount: profile.logins_count || 0,
      lastName: name[1],
      nickName: profile.screen_name || profile.nickname || name[1],
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
    aboutMe: aboutMe
  };
};

const parseFacebookData = service => ({
  email: service.email,
  name: `${service.first_name} ${service.last_name}`,
  createdAt: service.createdDate || Date.now(),
  info: {
    name: service.first_name,
    loginCount: service.logins_count || 0,
    lastName: service.last_name,
    img: service.picture,
    email: service.email,
    location: "",
    gender: "",
    website: "",
    phone: "",
    cover: ""
  },
  aboutMe: aboutMe
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
      loginCount: profile.logins_count || 0,
      nickName: profile.screen_name || profile.nickname,
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
    aboutMe: aboutMe
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
