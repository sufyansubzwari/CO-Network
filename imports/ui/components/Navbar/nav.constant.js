const base = {
  link: "/events",
  label: "Events",
  border: 1.5,
  number: {
    value: Math.floor(Math.random() * 120),
    primary: true,
    size: { width: 22, height: 24 }
  },
  size: { width: 52, height: 58 },
  icon: { size: 30, src: "/images/nav/event.svg" }
};
let event = Object.assign({}, base, {
  link: "/events",
  label: "Events"
});
event.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};
let jobs = Object.assign({}, base, {
  link: "/jobs",
  label: "Jobs",
  icon: { size: 30, src: "/images/nav/jobs.svg" }
});
jobs.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};
let innovators = Object.assign({}, base, {
  link: "/innovators",
  label: "Innovators",
  icon: { size: 34, src: "/images/nav/innovators.svg" }
});
innovators.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};
let dataStory = Object.assign({}, base, {
  link: "/data-story",
  label: "Data Story",
  comming: true,
  disabled: true,
  icon: { size: 30, src: "/images/nav/dataStory.svg" }
});
dataStory.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};
let colloquium = Object.assign({}, base, {
  link: "/colloquiums",
  label: "Colloquium",
  icon: { size: 34, src: "/images/nav/colloquium.svg" }
});
colloquium.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};

export default [event, jobs, innovators, dataStory, colloquium];
