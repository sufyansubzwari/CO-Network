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

export const MESSAGES_SIDEBAR_OPTIONS = ["All", "Unread", "Read"];

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

export const YEARS_EXPERIENCE = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "5+", label: "5+" },
  { value: "10+", label: "10+" }
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
    label: "Beginner",
    value: "Beginner"
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
  { value: "Career Fair", label: "Career Fair" },
  { value: "Casual | Social", label: "Casual | Social" },
  { value: "Conference", label: "Conference" },
  { value: "Hackathon", label: "Hackathon" },
  { value: "Networking", label: "Networking" },
  { value: "Talks & Panel Discussions", label: "Talks & Panel Discussions" },
  { value: "Tradeshow", label: "Tradeshow" },
  { value: "University Event", label: "University Event" },
  { value: "Workshop | Training", label: "Workshop | Training" }
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

export const LOCATIONS = [
  {
    location: {
      lat: 61.19533942,
      lng: -149.9054948
    },
    address:
      "Carrs-Anchorage #1805_1650 W Northern Lights Blvd_Anchorage, Alaska 99503"
  },
  {
    location: {
      lat: 45.16814002,
      lng: -93.23255345
    },
    address:
      "Super Target Blaine ST-1832_1500 109th Ave NE_Blaine, Minnesota 55449"
  },
  {
    location: {
      lat: 33.5081,
      lng: -117.057
    },
    address: "Albertsons - Temecula #6734_Temecula, California 92592"
  },
  {
    location: {
      lat: 34.02267128,
      lng: -118.4387225
    },
    address:
      "National & Barrington_11705 National Blvd._Los Angeles, California 900643644_(310) 914-4585"
  },
  {
    location: {
      lat: 39.19963807,
      lng: -84.37823047
    },
    address: "Kenwood_7896 Montgomery Road_Cincinnati, Ohio 452364301"
  },
  {
    location: {
      lat: 35.38337,
      lng: -119.14679
    },
    address:
      "Albertsons-Bakersfield #6377_13045 Rosedale Hwy_Bakersfield, California 93312"
  },
  {
    location: {
      lat: 42.79750285,
      lng: -86.13275107
    },
    address: "D & W Foods - Holland #249_50 Douglas Ave_Holland, Michigan 49464"
  },
  {
    location: {
      lat: 42.78323459,
      lng: -86.07600381
    },
    address: "Meijer-Holland #47_746 E 16th St_Holland, Michigan 49423"
  },
  {
    location: {
      lat: 42.828321,
      lng: -86.092646
    },
    address:
      "Meijer-Holland Twp #217_3320 West Shore Dr_Holland, Michigan 49424"
  },
  {
    location: {
      lat: 42.82743,
      lng: -86.091708
    },
    address: "Holland_3259 West Shore Drive_Holland, Michigan 49424"
  },
  {
    location: {
      lat: 42.587721,
      lng: -83.876697
    },
    address: "Meijer-Howell #172_3883 E Grand River_Howell, Michigan 48843"
  },
  {
    location: {
      lat: 42.633025,
      lng: -83.754669
    },
    address: "Target Hartland T-1971_10025 E Highland Rd_Howell, Michigan 48843"
  },
  {
    location: {
      lat: 42.25684019,
      lng: -84.3597484
    },
    address: "Meijer-Jackson #056_3333 E Michigan Ave_Jackson, Michigan 49202"
  },
  {
    location: {
      lat: 42.268927,
      lng: -84.424813
    },
    address:
      "Jackson, I-94 and M50_1801 North West Ave._Jackson, Michigan 49202"
  },
  {
    location: {
      lat: 42.29574836,
      lng: -85.68147197
    },
    address:
      "Meijers-Kalamazoo #119_6660 W Main St_Kalamazoo, Michigan 490098925"
  },
  {
    location: {
      lat: 42.25941639,
      lng: -85.61479013
    },
    address:
      "D & W Foods-Kalamazoo #430_2130 Parkview_Kalamazoo, Michigan 49008"
  },
  {
    location: {
      lat: 42.296156,
      lng: -85.65501
    },
    address: "Target  Kalamazoo T-901_5350 W Main St_Kalamazoo, Michigan 49009"
  },
  {
    location: {
      lat: 42.2961411,
      lng: -85.65537381
    },
    address:
      "Kalamazoo - West Main_5370 West Main Street_Kalamazoo, Michigan 49009"
  },
  {
    location: {
      lat: 42.78893033,
      lng: -83.24554959
    },
    address: "Kroger-Lake Orion #637_460 N Laper Rd_Lake Orion, Michigan 48362"
  },
  {
    location: {
      lat: 42.773185,
      lng: -83.239069
    },
    address: "Lake Orion_590 Lapeer Rd_Lake Orion, Michigan 48362"
  },
  {
    location: {
      lat: 42.74102205,
      lng: -84.63645985
    },
    address:
      "Kroger-Lansing #888_6430 W Saginaw Hwy_Lansing, Michigan 489171106"
  },
  {
    location: {
      lat: 42.7578,
      lng: -84.5243
    },
    address:
      "Eastwood Towne Center_2941 Preyde Blvd_Lansing, Michigan 489125624"
  },
  {
    location: {
      lat: 42.39782554,
      lng: -83.34945414
    },
    address: "Kroger-Livonia #618_30935 5 Mile Rd_Livonia, Michigan 48154"
  },
  {
    location: {
      lat: 42.5046,
      lng: -83.112566
    },
    address:
      "Madison Hgts, 12 Mile & Dartmouth_660 W. 12 Mile Rd_Madison Heights, Michigan 48071"
  },
  {
    location: {
      lat: 46.556614,
      lng: -87.396396
    },
    address:
      "Northern Michigan U/Marquette_1401 Presque Isle Ave_Marquette, Michigan 49855"
  },
  {
    location: {
      lat: 46.5493,
      lng: -87.455822
    },
    address:
      "Marquette, MI-Hwy 41 & 41 & Hwy 492_3105 US 41 West_Marquette, Michigan 49855"
  },
  {
    location: {
      lat: 42.91386,
      lng: -82.50029
    },
    address: "Meijer-Marysville #229_205 S Range Rd_Marysville, Michigan 48040"
  },
  {
    location: {
      lat: 43.7557,
      lng: -84.2468
    },
    address:
      "Midland, M-10 & Eastman_7201 Eastman Avenue_Midland, Michigan 48642"
  },
  {
    location: {
      lat: 42.59206587,
      lng: -83.60034748
    },
    address: "Milford_525 N. Main_Milford, Michigan 48381"
  }
];

export const JOB_TYPE_DEFAULT = [
  { label: "Full Time" },
  { label: "Part Time" },
  { label: "Consulting" },
  { label: "Intership" },
  { label: "Volunteer" }
];

export const LOOKING_FOR_DEFAULT_SPEAKER = [
  { label: "Passionate Educator (K-12)" },
  { label: "University Level Lecturer" },
  { label: "Science Communicator" },
  { label: "Corporate Speaker (Executive)" },
  { label: "Conference Speaker (Expert)" }
];

export const ORGANIZATION_TYPE = [
  {
    label: "Academia",
    value: "Academia"
  },
  {
    label: "Corporation",
    value: "Corporation"
  },
  {
    label: "Conference Organizer",
    value: "Conference Organizer"
  },
  {
    label: "Event Organizer",
    value: "Event Organizer"
  },
  {
    label: "Incubator",
    value: "Incubator"
  },
  {
    label: "Accelerator",
    value: "Accelerator"
  },
  {
    label: "Journal",
    value: "Journal"
  },
  {
    label: "Publisher",
    value: "Publisher"
  },
  {
    label: "Media",
    value: "Media"
  },
  {
    label: "Nonprofit",
    value: "Nonprofit"
  },
  {
    label: "Startup",
    value: "Startup"
  },
  {
    label: "Think Tank",
    value: "Think Tank"
  },
  {
    label: "Venture Capital",
    value: "Venture Capital"
  },
  {
    label: "Fund",
    value: "Fund"
  },
  {
    label: "Venue for Events",
    value: "Venue for Events"
  },
  {
    label: "Coworking Space",
    value: "Coworking Space"
  }
];

export const ACTIVELY = [
  { label: "Recruit Technical Talent" },
  { label: "Host Conferences | Events" },
  { label: "Sponsors Events" }
];

export const ORG_TYPE_NUMBER = ORGANIZATION_TYPE.map((element, index) => {
  const item = Object.assign({}, element);
  item.active = false;
  item.number = 0;
  return item;
});

export const ORGANIZATION_TAGS = [
  { name: "Bioinformatics", active: false, userAdd: false },
  { name: "Python", userAdd: false, active: false },
  { name: "Oil&Gas", active: false, userAdd: false },
  { name: "MachineLearning", userAdd: false, active: false },
  { name: "MachineLearning", userAdd: false, active: false },
  { name: "userAdd 1", active: false, userAdd: true }
];

export const INDUSTRY_SECTOR = [
  { name: "Bioinformatics", active: true, userAdd: false },
  { name: "Python", userAdd: false, active: false },
  { name: "Oil&Gas", active: false, userAdd: false },
  { name: "MachineLearning", userAdd: false, active: false },
  { name: "MachineLearning", userAdd: false, active: false },
  { name: "userAdd 1", active: true, userAdd: true, closable: true }
];

export const INDUSTRY_SECTOR_OPTIONS = [
  { value: "Chemical", label: "Chemical" },
  { value: "Construction", label: "Construction" },
  { value: "Aeroespace & Defense", label: "Aeroespace & Defense" },
  { value: "Energy & Utilities", label: "Energy & Utilities" }
];

export const PREFERRED_STAGE = [
  { label: "Technical Workshop" },
  { label: "Conference Presenter" },
  { label: "Lecture Hall" },
  { label: "Digital Media (Podcast, Youtube)" },
  { label: "Panel Discussions | Interviews" }
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
    icon: "/images/icons/line3.svg"
  },
  {
    value: "experienced",
    label: "Experienced",
    levelColor: "#464646",
    icon: "/images/icons/line2.svg"
  },
  {
    value: "entryLevel",
    label: "Entry Level",
    levelColor: "#8e8a8a",
    icon: "/images/icons/line1.svg"
  }
];

export const POSITION_TAGS = [
  { name: "DataScience", active: true, userAdd: false, closable: true },
  { name: "Bio", active: true, userAdd: false, closable: true },
  { name: "Loremipsumdolorem", active: true, userAdd: false, closable: true },
  { name: "Ipsumdolorem", active: true, userAdd: false, closable: true },
  { name: "Dolorem", active: true, userAdd: false, closable: true },
  { name: "Dumdolorem", active: true, userAdd: false, closable: true }
];

export const JOB_TYPE_NUMBER = [
  { label: "Full Time", active: false, number: 0 },
  { label: "Part Time", active: false, number: 0 },
  { label: "Volunteer | Intern", active: false, number: 0 }
];

export const EXPERIENCE_REQUIERED = [
  {
    label: "Entry Level",
    value: "Entry Level",
    name: "Entry Level",
    active: false
  },
  {
    label: "Intermediate",
    value: "Intermediate",
    name: "Intermediate",
    active: false
  },
  { label: "Expert", value: "Expert", name: "Expert", active: false }
];

export const EXPERIENCE_REQUIERED_NUMBER = [
  { label: "Entry Level", active: false, number: 0 },
  { label: "Intermediate", active: false, number: 0 },
  { label: "Expert", active: false, number: 0 }
];

export const COLLOQUIUM_LEVEL = [
  {
    label: "Beginner",
    value: "Beginner"
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

export const INNOVATORS_TYPES = [
  {
    title: "Members",
    value: "members"
  },
  {
    title: "Corporations",
    value: "corporations"
  }
  // {
  //   title: "Communities",
  //   value: "communities"
  // }
];

export const LOCATION_RANGE_OPTIONS = [
  { label: "5 miles radius", value: 0.05 },
  { label: "10 miles radius", value: 0.10 },
  { label: "20 miles radius", value: 0.20 }
];
