const base = {
  link: "/events",
  title: "Events",
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
  title: "Events"
});
event.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};

let jobs = Object.assign({}, base, {
  link: "/jobs",
  title: "Jobs",
  icon: { size: 30, src: "/images/nav/jobs.svg" }
});
jobs.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};
let innovators = Object.assign({}, base, {
  link: "/innovators",
  title: "Innovators",
  icon: { size: 34, src: "/images/nav/innovators.svg" }
});
innovators.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};

let data = Object.assign({}, base, {
  link: "/data-story",
  title: "Data Story",
  icon: { size: 30, src: "/images/nav/Colloquium.svg" }
});

let Colloquium = Object.assign({}, base, {
  link: "/colloquium",
  title: "Colloquium",
  icon: { size: 30, src: "/images/nav/Colloquium.svg" }
});

Colloquium.number = {
  value: 0,
  primary: true,
  size: { width: 22, height: 24 }
};

export default [event, jobs, innovators, Colloquium];
