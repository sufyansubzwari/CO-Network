export const FILTER_MENU = [
  { label: "All", entity: "all" },
  { label: "Events", entity: "event" },
  { label: "Jobs", entity: "job" },
  { label: "Organizations", entity: "organization" },
  { label: "Member", entity: "user" }
];

export const FILTER_INNOVATORS = [
  { label: "All", entity: ["user", "organization"] }, //'community',
  /* {label: "Community", entity: 'community'},*/
  { label: "Organization", entity: "organization" },
  { label: "Member", entity: "user" }
];
export const FILTER_MY_VIEW = [
  { label: "All", entity: ["event", "organization", "user"] },
  { label: "My events", entity: "event" },
  { label: "Colaborators", entity: "user" },
  { label: "Organizations", entity: "organization" }
];
export const POST_JOB_ACTION = [{ link: "/post-job?new", title: "POST JOB" }];

export const POST_EVENT_ACTION = [{ link: "/post-event", title: "POST EVENT" }];

export const POST_COMMUNITY_ACTION = [
  { link: "/post-community", title: "POST COMMUNITY" }
];

export const DOMAIN_EXPERT = [
  { label: "Aerospace", value: "Aerospace" },
  { label: "Defense", value: "Defense" },
  { label: "Agricultural", value: "Agricultural" },
  { label: "Automotive", value: "Automotive" },
  { label: "Pharmaceuticals", value: "Pharmaceuticals" },
  { label: "Biotechnology", value: "Biotechnology" },
  { label: "Chemical", value: "Chemical" },
  { label: "Clean Energy", value: "Clean Energy" },
  { label: "Communications", value: "Communications" },
  { label: "Construction", value: "Construction" },
  { label: "Consumer Goods", value: "Consumer Goods" },
  { label: "Education & Academia", value: "Education & Academia" },
  { label: "Electronics", value: "Electronics" },
  { label: "Energy", value: "Energy" },
  { label: "Utilities", value: "Utilities" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Financial Services", value: "Financial Services" },
  { label: "Banking", value: "Banking" },
  { label: "Fitness", value: "Fitness" },
  { label: "Food", value: "Food" },
  { label: "Gaming", value: "Gaming" },
  { label: "Government", value: "Government" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Hospitality", value: "Hospitality" },
  { label: "Humanitarian", value: "Humanitarian" },
  { label: "Information Technology", value: "Information Technology" },
  { label: "Insurance", value: "Insurance" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Media", value: "Media" },
  { label: "Mining", value: "Mining" },
  { label: "News & Journalism", value: "News & Journalism" },
  { label: "Oil", value: "Oil" },
  { label: "Gas", value: "Gas" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Retail", value: "Retail" },
  { label: "Robotics", value: "Robotics" },
  { label: "Sales", value: "Sales" },
  { label: "Shipping", value: "Shipping" },
  { label: "Software", value: "Software" },
  { label: "Telecommunications", value: "Telecommunications" },
  { label: "Transportation", value: "Transportation" },
  { label: "Travel", value: "Travel" }
];

export const LANGUAGES_LIBRARIES = [
  { label: "R", value: "R", level: "", categories: ["language"] },
  { label: "Agile", value: "Agile", level: "", categories: ["framework"] },
  {
    label: "Ansible",
    value: "Ansible",
    level: "",
    categories: ["framework"]
  },
  { label: "Arduino", value: "Arduino", level: "", categories: ["language"] },
  {
    label: "ASP.NET",
    value: "ASP.NET",
    level: "",
    categories: ["framework", "web development"]
  },
  { label: "Assembly", value: "Assembly", level: "" },
  { label: "AWS", value: "AWS", level: "" },
  { label: "Bash", value: "Bash", categories: ["language"] },
  { label: "Beautiful Soup", value: "Beautiful Soup", level: "" },
  { label: "Big O Complexity", value: "Big O Complexity", level: "" },
  { label: "Big Query", value: "Big Query", level: "" },
  { label: "Bokeh", value: "Bokeh", level: "" },
  { label: "C", value: "C", level: "", categories: ["language"] },
  { label: "C#", value: "C#", level: "", categories: ["language"] },
  { label: "C++", value: "C++", level: "", categories: ["language"] },
  { label: "Caffe", value: "Caffe", level: "" },
  { label: "Caret", value: "Caret", level: "" },
  { label: "Cassandra", value: "Cassandra", level: "" },
  { label: "CloudFoundry", value: "CloudFoundry", level: "" },
  { label: "CSS3", value: "CSS3", level: "" },
  { label: "D", value: "D", level: "" },
  { label: "D3.js", value: "D3.js" },
  { label: "DeepLearning4j", value: "DeepLearning4j", level: "" },
  { label: "Delphi", value: "Delphi", level: "", categories: ["language"] },
  {
    label: "Django",
    value: "Django",
    level: "",
    categories: ["framework", "web development"]
  },
  { label: "Docker", value: "Docker", level: "" },
  { label: "Elastic Search", value: "Elastic Search", level: "" },
  { label: "Flare", value: "Flare", level: "" },
  { label: "Fortran", value: "Fortran", level: "" },
  { label: "GIT", value: "GIT", level: "" },
  { label: "Go", value: "Go", level: "" },
  { label: "Google Analytics", value: "Google Analytics", level: "" },
  { label: "Graph databases", value: "Graph databases", level: "" },
  { label: "Hadoop", value: "Hadoop", level: "" },
  { label: "Haskell", value: "Haskell", level: "" },
  { label: "HBase", value: "HBase", level: "" },
  { label: "Hive", value: "Hive", level: "" },
  { label: "HTML", value: "HTML", level: "" },
  { label: "Impala", value: "Impala", level: "" },
  { label: "Java", value: "Java", level: "", categories: ["language"] },
  {
    label: "Javascript",
    value: "Javascript",
    level: "",
    categories: ["language", "wev development"]
  },
  { label: "Jenkins", value: "Jenkins", level: "" },
  { label: "Kafka", value: "Kafka", level: "" },
  { label: "Keras", value: "Keras", level: "" },
  { label: "Kubernetes", value: "Kubernetes", level: "" },
  { label: "Linux OS", value: "Linux OS", level: "" },
  { label: "Lisp", value: "Lisp", level: "" },
  { label: "Lua", value: "Lua", level: "" },
  { label: "MapReduce", value: "MapReduce", level: "" },
  { label: "Matlab", value: "Matlab", level: "" },
  { label: "Matplotlib", value: "Matplotlib", level: "" },
  { label: "Merlin", value: "Merlin", level: "" },
  {
    label: "Meteor",
    value: "Meteor",
    level: "",
    categories: ["framework", "web development"]
  },
  { label: "Microservices", value: "Microservices", level: "" },
  { label: "Microsoft Azure", value: "Microsoft Azure", level: "" },
  { label: "MLLib", value: "MLLib", level: "" },
  { label: "MongoDB", value: "MongoDB", level: "" },
  { label: "MySQL", value: "MySQL", level: "" },
  { label: "Neo4j", value: "Neo4j", level: "" },
  { label: "Node.js", value: "Node.js", level: "" },
  { label: "NoSQL", value: "NoSQL", level: "" },
  { label: "Numpy", value: "Numpy", level: "" },
  { label: "Objective-C", value: "Objective-C", level: "" },
  { label: "Operations", value: "Operations", level: "" },
  { label: "Oracle", value: "Oracle", level: "" },
  { label: "Pandas", value: "Pandas", level: "" },
  { label: "Perl", value: "Perl", level: "" },
  { label: "PHP", value: "PHP", level: "" },
  { label: "Pig", value: "Pig", level: "" },
  { label: "PostgreSQL", value: "PostgreSQL", level: "" },
  { label: "Power BI", value: "Power BI", level: "" },
  { label: "Processing", value: "Processing", level: "" },
  { label: "Puppet", value: "Puppet", level: "" },
  { label: "PySpark", value: "PySpark", level: "" },
  {
    label: "Python",
    value: "Python",
    level: "",
    categories: ["language", "web developent"]
  },
  { label: "Qlik", value: "Qlik", level: "" },
  { label: "R Studio IDE", value: "R Studio IDE", level: "" },
  {
    label: "React",
    value: "React",
    level: "",
    categories: ["framework", "web development"]
  },
  { label: "Redis", value: "Redis", level: "" },
  { label: "REST API", value: "REST API", level: "" },
  { label: "Ruby", value: "Ruby", level: "" },
  { label: "Ruby on Rails", value: "Ruby on Rails", level: "" },
  { label: "Rust", value: "Rust", level: "" },
  { label: "SAS", value: "SAS", level: "" },
  { label: "Scala", value: "Scala", level: "" },
  { label: "Scikit-learn", value: "Scikit-learn", level: "" },
  { label: "SciPy", value: "SciPy", level: "" },
  { label: "Scrapy", value: "Scrapy", level: "" },
  { label: "Scrum", value: "Scrum", level: "" },
  { label: "Shell", value: "Shell", level: "" },
  { label: "Spark", value: "Spark", level: "" },
  { label: "Spring", value: "Spring", level: "" },
  { label: "SPSS", value: "SPSS", level: "" },
  { label: "SQL", value: "SQL", level: "" },
  { label: "SQL server", value: "SQL server", level: "" },
  { label: "Tableau", value: "Tableau", level: "" },
  { label: "Tensor Flow", value: "Tensor Flow", level: "" },
  { label: "Teradata", value: "Teradata", level: "" },
  { label: "Theano", value: "Theano", level: "" },
  { label: "Torch", value: "Torch", level: "" },
  { label: "Travis CI", value: "Travis CI", level: "" },
  { label: "Unix", value: "Unix", level: "" },
  { label: "VHDL", value: "VHDL", level: "" },
  { label: "Visual Basic", value: "Visual Basic", level: "" },
  { label: "Web - Backend", value: "Web - Backend", level: "" },
  { label: "Web - Frontend", value: "Web - Frontend", level: "" },
  { label: "Web Analytics (SEO)", value: "Web Analytics (SEO)", level: "" },
  { label: "Zend Framework", value: "Zend Framework", level: "" }
];

export const SALARY_RANGE = [
  { label: "Volunteer", value: "Volunteer" },
  { label: "Internship", value: "Internship" },
  { label: "PostDoc", value: "PostDoc" },
  { label: "60,000 - 80,000", value: "60,000 - 80,000" },
  { label: "80,000 - 100,000", value: "80,000 - 100,000" },
  { label: "100,000 - 120,000", value: "100,000 - 120,000" },
  { label: "120,000 - 150,000", value: "120,000 - 150,000" },
  { label: "150,000 - 200,000", value: "150,000 - 200,000" },
  { label: "200,000 - 250,000", value: "200,000 - 250,000" },
  { label: "250,000 - 300,000", value: "250,000 - 300,000" },
  { label: "300,000+", value: "300,000+" },
  { label: "500,000+", value: "500,000+" },
  { label: "Other", value: "Other" }
];

export const DOMAIN_OPTIONS = [
  { value: "expert", label: "Expert", color: "#FF1493" },
  { value: "experienced", label: "Experienced", color: "#464646" },
  { value: "entryLevel", label: "Entry Level", color: "#8e8a8a" }
];

export const SKILL_OPTIONS = [
  { value: "advanced", label: "Advanced", color: "#FF1493" },
  { value: "intermediate", label: "Intermediate", color: "#464646" },
  { value: "beginner", label: "Beginner", color: "#8e8a8a" }
];

export const LOOKING_FOR = [
  { value: "Co-Founders", label: "Co-Founders" },
  { value: "Competition Teammates", label: "Competition Teammates" },
  { value: "Data Trading", label: "Data Trading" },
  { value: "Individuals to Mentor", label: "Individuals to Mentor" },
  { value: "Mentorship", label: "Mentorship" },
  { value: "Scientific Collaborations", label: "Scientific Collaborations" },
  { value: "Study Group Companions", label: "Study Group Companions" },
  { value: "Tech Project Partners", label: "Tech Project Partners" }
];

export const JOB_TYPE = [
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time ", label: "Part Time" },
  { value: "Consulting", label: "Consulting" },
  { value: "Internship", label: "Internship" },
  { value: "Volunteer", label: "Volunteer" }
];

export const EVENT_CATEGORIES = [
  {
    label: "Autonomous Systems",
    value: "Autonomous Systems"
  },
  {
    label: "Computer Vision",
    value: "Computer Vision"
  },
  {
    label: "Bioinformatics",
    value: "Bioinformatics"
  },
  {
    label: "Genomics",
    value: "Genomics"
  },
  {
    label: "Blockchain",
    value: "Blockchain"
  },
  {
    label: "Cryptocurrency",
    value: "Cryptocurrency"
  },
  {
    label: "Fintech",
    value: "Fintech"
  },
  {
    label: "Industry (Media)",
    value: "Industry (Media)"
  },
  {
    label: "Industry (Retail)",
    value: "Industry (Retail)"
  },
  {
    label: "Business Analytics",
    value: "Business Analytics"
  },
  {
    label: "Cleantech",
    value: "Cleantech"
  },
  {
    label: "Environmental",
    value: "Environmental"
  },
  {
    label: "Alt Energy",
    value: " Alt Energy"
  },
  {
    label: "Computational Sciences",
    value: "Computational Sciences"
  },
  {
    label: "Cyber Security",
    value: "Cyber Security"
  },
  {
    label: "Cryptography",
    value: "Cryptography"
  },
  {
    label: "Data Center",
    value: "Data Center"
  },
  {
    label: "Cloud Technologies",
    value: "Cloud Technologies"
  },
  {
    label: "Data Science",
    value: "Data Science"
  },
  {
    label: "Engineering",
    value: "Engineering"
  },
  {
    label: "General Technology Fair",
    value: "General Technology Fair"
  },
  {
    label: "Hackathon",
    value: "Hackathon"
  },
  {
    label: "HPC (High Performance Computing)",
    value: "HPC (High Performance Computing)"
  },
  {
    label: "IOT (Internet of Things)",
    value: "IOT (Internet of Things)"
  },
  {
    label: "Materials Science",
    value: "Materials Science"
  },
  {
    label: "Statistics",
    value: "Statistics"
  },
  {
    label: "Microprocessors",
    value: "Microprocessors"
  },
  {
    label: "Embedded Systems (GPU)",
    value: "Embedded Systems (GPU)"
  },
  {
    label: "Embedded Systems (CPU)",
    value: "Embedded Systems (CPU)"
  },
  {
    label: "Embedded Systems (TPU)",
    value: "Embedded Systems (TPU)"
  },
  {
    label: "Embedded Systems (FPGA)",
    value: "Embedded Systems (FPGA)"
  },
  {
    label: "Neuroscience",
    value: "Neuroscience"
  },
  {
    label: "BCI",
    value: "BCI"
  },
  {
    label: "Physics",
    value: "Physics"
  },
  {
    label: "Astronomy",
    value: "Astronomy"
  },
  {
    label: "Cosmology",
    value: "Cosmology"
  },
  {
    label: "Robotics",
    value: "Robotics"
  },
  {
    label: "Supercomputing",
    value: "Supercomputing"
  },
  {
    label: "Toolkits (R)",
    value: "Toolkits (R)"
  },
  {
    label: "Toolkits (Python)",
    value: "Toolkits (Python)"
  },
  {
    label: "Toolkits (Spark ….)",
    value: "Toolkits (Spark ….)"
  },
  {
    label: "Augmented Reality",
    value: "Augmented Reality"
  },
  {
    label: "Virtual",
    value: "Virtual"
  }
];

export const FEED_TYPES = [
  {
    label: "New feature",
    value: "feature"
  },
  {
    label: "Bug",
    value: "bug"
  },
  {
    label: "Comment",
    value: "comment"
  }
];

export const GENDERS = [
  {
    label: "Female",
    value: "female"
  },
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Non-binary",
    value: "non-binary"
  },
  {
    label: "Transgender",
    value: "transgender"
  },
  {
    label: "Prefer to self-describe",
    value: "self-describe"
  },
  {
    label: "Prefer not to say",
    value: "prefer-not-to-say"
  }
];

export const DEGREE = [
  {
    label: "Bachelors",
    value: "bachelors"
  },
  {
    label: "Masters",
    value: "master"
  },
  {
    label: "P.h.D",
    value: "p.h.d"
  },
  {
    label: "Other",
    value: "other"
  }
];

export const PROFESSIONAL_EXPERIENCE = [
  {
    label: "Scientiest | Researcher",
    value: "scientiest | researcher"
  },
  {
    label: "Entrepreneur",
    value: "entrepreneur"
  },
  {
    label: "Executive",
    value: "executive"
  },
  {
    label: "Director",
    value: "director"
  },
  {
    label: "Business | Marketing",
    value: "business | marketing"
  },
  {
    label: "Business | Marketing",
    value: "business | marketing"
  },
  {
    label: "Volunteer | Intern",
    value: "volunteer | intern"
  },
  {
    label: "Other",
    value: "Other"
  }
];

export const COURSE_LEVEL = [
  {
    label: "Beginneer",
    value: "Beginneer"
  },
  {
    label: "Intermediate",
    value: "Intermediate"
  },
  {
    label: "Advanced",
    value: "Advanced"
  }
];

export const EVENT_SIZE = [
  { value: "1-10", label: "1-10" },
  { value: "10-20", label: "10-20" },
  { value: "20-50", label: "20-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-200", label: "100-200" },
  { value: "200-300", label: "200-300" },
  { value: "200-300", label: "200-300" },
  { value: "300-500", label: "300-500" },
  { value: "500-1000", label: "500-1000" },
  { value: "1000-2000", label: "1000-2000" },
  { value: "2000-5000", label: "2000-5000" },
  { value: "5000+", label: "5000+" }
];
export const TIKET_TYPE = [
  { value: "Paid", label: "Paid" },
  { value: "Free", label: "Free" },
  { value: "Volunteer", label: "Volunteer" }
];
export const EVENT_TYPE = [
  { value: "Technical Workshop", label: "Technical Workshop" },
  { value: "Panel Discussion", label: "Panel Discussion" },
  { value: "Academic", label: "Academic" },
  { value: "Recruiting | Career", label: "Recruiting | Career" },
  {
    value: "Science Interactive (Hikes, Games, Theater, Comedy)",
    label: "Science Interactive"
  },
  { value: "Networking", label: "Networking" }
];
export const defaultFilter = [
  { name: "Data Science", value: "Data Science", active: true },
  {
    name: "Individuals to Mentor",
    value: "Individuals to Mentor",
    active: true
  },
  {
    name: "Artificial Intelligence",
    value: "Artificial Intelligence",
    active: true
  },
  { name: "MachineLearning", value: "MachineLearning", active: true },
  { name: "NLP", value: "NLP", active: true },
  { name: "Algorithms", value: "Algorithms", active: true },
  { name: "Bioinformatics", value: "Bioinformatics", active: true },
  { name: "Genomics", value: "Genomics", active: true },
  { name: "Blockchain", value: "Blockchain", active: true },
  { name: "Cryptography", value: "Cryptography", active: true },
  { name: "Mathematics", value: "Mathematics", active: true },
  { name: "Energy", value: "Energy", active: true },
  { name: "Graphene", value: "Graphene", active: true },
  { name: "Nanotechnology", value: "Nanotechnology", active: true },
  { name: "Robotics", value: "Robotics", active: true },
  { name: "Embedded Systems", value: "Embedded Systems", active: true },
  { name: "Smart Cities", value: "Smart Cities", active: true },
  { name: "Cybersecurity", value: "Cybersecurity", active: true },
  { name: "Neuroscience", value: "Neuroscience", active: true }
];
