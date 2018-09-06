const base = {
  link: "/events",
  title: "Events",
  number: {
    value: Math.floor(Math.random() * 120),
    primary: true,
    size: { width: 19, height: 22 }
  },
  size: { width: 52, height: 58 },
  icon: { size: 30, src: "/images/nav/event.svg" }
};
let event = Object.assign({}, base, {
  link: "/events",
  title: "Events"
});
let jobs = Object.assign({}, base, {
  link: "/jobs",
  title: "Jobs",
  icon: { size: 30, src: "/images/nav/jobs.svg" }
});
let innovators = Object.assign({}, base, {
  link: "/innovators",
  title: "Innovators",
  icon: { size: 34, src: "/images/nav/innovators.svg" }
});
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

export default [event, jobs, innovators, data, Colloquium];
