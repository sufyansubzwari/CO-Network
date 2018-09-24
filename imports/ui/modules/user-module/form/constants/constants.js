export const USER_TAGS = [
  { name: "Bioinformatics", active: true, userAdd: false },
  { name: "Python", userAdd: false, active: false },
  { name: "Oil&Gas", active: false, userAdd: false },
  { name: "MachineLearning", userAdd: false, active: false },
  { name: "MachineLearning", userAdd: false, active: false },
  { name: "userAdd 1", active: true, userAdd: true, closable: true }
];

export const LOOKING_FOR = [
  { label: "Co-Founders for Startup", active: true },
  { label: "Competition Teammates", active: false },
  { label: "Individuals to Mentor", active: false },
  { label: "Mentorship", active: false },
  { label: "Teach Project Partners", active: false },
  { label: "Data Trading", active: true },
  { label: "Scientific Collaborations", active: false },
  { label: "Study Group Companions", active: false }
];

export const LOOKING_FOR_DEFAULT = [
  { label: "Co-Founders for Startup" },
  { label: "Competition Teammates" },
  { label: "Individuals to Mentor" },
  { label: "Mentorship" },
  { label: "Teach Project Partners" },
  { label: "Data Trading" },
  { label: "Scientific Collaborations" },
  { label: "Study Group Companions" }
];

export const TAG_LEVEL = [
  {
    value: "expert",
    label: "Expert",
    levelColor: "#FF1493",
    icon: "star"
  },
  {
    value: "experienced",
    label: "Experienced",
      levelColor: "#464646",
    icon: "star"
  },
  {
    value: "entrylevel",
    label: "Entry Level",
      levelColor: "#d8d8d8",
    icon: "star"
  }
];

export const LOOKING_FOR_DEFAULT_SPEAKER = [
  { label: "Co-Founders for Startup" },
  { label: "Competition Teammates" },
  { label: "Individuals to Mentor" },
  { label: "Mentorship" },
  { label: "Teach Project Partners" },
  { label: "Data Trading" },
  { label: "Scientific Collaborations" },
  { label: "Study Group Companions" }
];

export const JOB_TYPE = [
  { label: "Full Time", active: true },
  { label: "Part Time", active: false },
  { label: "Consulting", active: false },
  { label: "Intership", active: false },
  { label: "Volunteer", active: false }
];

export const JOB_TYPE_DEFAULT = [
  { label: "Full Time" },
  { label: "Part Time" },
  { label: "Consulting" },
  { label: "Intership" },
  { label: "Volunteer" }
];

export const PREFERRED_STAGE = [
  { label: "Technical Workshop" },
  { label: "Conference Presenter" },
  { label: "Lecture Hall" },
  { label: "Digital Media (Podcast, Youtube)" },
  { label: "Panel Discussions | Interviews" }
];

export const INDUSTRY_SECTOR_OPTIONS = [
  { value: "Chemical", label: "Chemical" },
  { value: "Construction", label: "Construction" },
  { value: "Aeroespace & Defense", label: "Aeroespace & Defense" },
  { value: "Energy & Utilities", label: "Energy & Utilities" }
];

export const SIGNUP_TEXT =
  'The "CO Network" is a technical social network engineered to accelerate global innovations in:';

export const SIGNUP_TEXT_2 =
  "Welcome to a trusted marketplace for the exchange of powerful ideas between scientists, entrepreneurs, innovators and organizations.";

export const SIGNUP_TEXT_3 =
  "By registering for the “CO Network”, you are entering a binding agreement to exercise your passion and creativity on the world’s biggest challenges.";

export const SIGNUP_OPTIONS = [
  { label: "Innovation emerges from unrestrained collaboration" },
  { label: "The most valuable currency is rigorous curiosity" },
  { label: "Every interaction moves towards something created" }
  // {label: 'I agree to uphold the values, culture and ethics outlined in the CO Network’s Terms and Conditions, GDPR Compliant Privacy Policy, Anti-Spam Policy agreement.'},
];

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
