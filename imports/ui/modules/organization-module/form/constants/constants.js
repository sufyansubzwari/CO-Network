export const ORGANIZATION_TYPE = [
        {label: 'Academia'},
        {label: 'Corporation'},
        {label: 'Comunity'},
        {label: 'Government'},
        {label: 'Academia1'},
        {label: 'Corporation1'},
        {label: 'Comunity1'},
        {label: 'Government1'}
    ]
;

export const ACTIVELY = [
    {label: 'Recruit Technical Talent'},
    {label: 'Host Conferences | Events'},
    {label: 'Sponsors Events'},
];

export const JOB_TYPE = [
    { label: "Full Time" },
    { label: "Part Time" },
    { label: "Consulting" },
    { label: "Internship" },
    { label: "Volunteer" }
]

export const ORG_TYPE_NUMBER = [
    {label: 'Corporation', active: true, number: 12},
    {label: 'Community', active: false, number: 3},
    {label: 'Venture Capital', active: true, number : 22}
    ]

export const ORGANIZATION_TAGS = [
        {name: 'Bioinformatics', active: true, userAdd: false},
        {name: 'Python', userAdd: false, active: false},
        {name: 'Oil&Gas', active: false, userAdd: false},
        {name: 'MachineLearning', userAdd: false, active: false},
        {name: 'MachineLearning', userAdd: false, active: false},
        {name: 'userAdd 1', active: true, userAdd: true, closable: true},
    ]
;

export const INDUSTRY_SECTOR = [
        {name: 'Bioinformatics', active: true, userAdd: false},
        {name: 'Python', userAdd: false, active: false},
        {name: 'Oil&Gas', active: false, userAdd: false},
        {name: 'MachineLearning', userAdd: false, active: false},
        {name: 'MachineLearning', userAdd: false, active: false},
        {name: 'userAdd 1', active: true, userAdd: true, closable: true},
    ]
;

export const INDUSTRY_SECTOR_OPTIONS = [
        { value: "Chemical", label: "Chemical" },
        { value: "Construction", label: "Construction" },
        { value: "Aeroespace & Defense", label: "Aeroespace & Defense" },
        { value: "Energy & Utilities", label: "Energy & Utilities" }
    ]
;

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
