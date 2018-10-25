const color = {
  primary: "#F92672",
  primaryHover: "linear-gradient(353deg, #f92672, #e826f9)",
  warning: "#ffbf00",
  danger: "#ff2e00",
  success: "#85cc00",
  info: "#378bff",
  black: "#0e1800",
  borderActiveColor: "#F92672",
  backgroundLight: "#f5f7fb",
  background: "#dadada",
  dropDownHover: "#f6f6f6",
  default: "#FFFFFF",
  grey: "#dbdbdb",
  innerBackground: "#F9F9FB"
};

const inverse = {
  primary: "#FFFFFF",
  warning: "#FFFFFF",
  danger: "#FFFFFF",
  success: "#FFFFFF",
  info: "#FFFFFF",
  default: color.black
};

const sizes = {
  phone: 376,
  tablet: 768,
  desktop: 992,
  giant: 1170
};

const sidebar = {
  bottomLinks: {
    fontSize: "10px",
    color: "initial"
  }
};

const signup = {
  descriptionSize: "14px",
  optionsSize: "12px",
  family: "Roboto Mono",
  fontcolor: "#2B2B2B",
  headerBackground: "white",
  descriptionBackground: "rgb(209,209,209,0.2)",
  borderColor: "#dbdbdb",
  optionColor: "#6d6969"
};

const card = {
  border: 1,
  borderActive: 1,
  borderColor: color.borderColor,
  backgroundNullImage: color.backgroundNullImage,
  backgroundImage: "#fff",
  backgroundImageActive: color.backgroundImageActive,
  borderActiveColor: color.borderActiveColor
};

const create = {
  heading: {
    family: "Helvetica Neue LT Std",
    size: "24px",
    lineHeight: "26px",
    align: "center",
    color: "#ffffff"
  },
  subheading: {
    family: "Roboto Mono",
    size: "12px",
    align: "center",
    color: "#ffffff"
  }
};

const preview = {
  photo: {
    topcolor: "#32363D",
    bottomcolor: "#202225",
    height: "187px",
    fontsize: "14px",
    fontcolor: "#C6C6C9",
    fontfamily: "Roboto Mono",
    borderSectionColor: "#dbdbdb"
  },
  userphoto: {
    height: "75px",
    width: "75px",
    background: "#32363D",
    borderColor: "#ffffff",
    family: "Helvetica Neue LT Std",
    fontcolor: "#D2DDE2",
    fontsize: "18px",
    fontWidth: "75px"
  },
  nav: {
    fontweight: "bold",
    fontsize: "14px",
    color: "black",
    family: "Helvetica Neue LT Std"
  },
  title: {
    family: "Helvetica Neue LT Std",
    size: "24px",
    lineheight: "18px",
    color: "#2b2b2b"
  },
  locations: {
    family: "Roboto Mono",
    size: "14px",
    lineheight: "initial",
    color: "#2b2b2b",
    colorIcon: color.primary
  },
  social: {
    size: "15px",
    horizontalSeparation: "13px",
    linkColor: "#3A7BC5",
    linkFamily: "Roboto Mono",
    linkSize: "12px",
    linkLineHeight: "24px"
  },
  text: {
    titleColor: "#000000",
    titleFamily: "Roboto Mono",
    titleSize: "12px",
    titleLineHeight: "24px",
    titleWeight: "600",
    textColor: "#2b2b2b",
    textFamily: "Roboto Mono",
    textSize: "12px",
    textLineHeight: "24px",
    textWeight: "300",
    marginBottom: "0.5rem",
    marginRight: "5px"
  },
  section: {
    titleFamily: "Helvetica Neue LT Std",
    titleColor: "#000000",
  },
  borderColor: "#DBDBDB",
  background: "#F9F9FB",
};

const filter = {
  borderColor: "#DBDBDB",
  separatorColor: "#BEBEBE",
  heading: {
    family: "Helvetica Neue Lt std",
    font: "18px",
    marginleft: "22px",
    margintop: "29px",
    marginbottom: "25px"
  }
};

const lightBoxTheme = {
    close: {
        color: "white",
        fill: "white",
        opacity: 0.6,
        transition: "all 200ms",
        ":hover": {
            opacity: 1
        },
        ":focus": { outline: "0" }
    },
    arrow: {
        color: "white",
        fill: "white",
        opacity: 0.6,
        transition: "all 200ms",
        ":hover": {
            opacity: 1
        },
        ":focus": { outline: "0" }
    }
};

const bigtag = {
  color: {
    primary: "#F92672",
    black: "#010101",
    lightblue: "#E9EFF0",
    gray: "#F3F3F3"
  },
  font: {
    family: "Roboto Mono",
    size: "10px",
    weight: "300",
    lineHeight: "0",
    align: "center"
  }
};

const lists = {
  scrollSeparation: 15,
  mobileScrollSeparation: 10,
  itemSeparation: 10,
  mobileMarginBottom: 45,
  marginBottom: 25,
};

const texts = {
  title: {
    fontFamily: "Helvetica Neue LT Std",
    titleColor: "#000000",
    titleFamily: "Roboto Mono",
    titleSize: "14px",
    titleLineHeight: "24px",
    titleWeight: "600"
  },
  fontFamily: "Roboto Mono",
  textColor: "#2b2b2b",
  textFamily: "Roboto Mono",
  textSize: "12px",
  textLineHeight: "14px",
  textWeight: "300"
};

const font = {
  fontSize: "12px"
};

const forms = {
  rowSpace: "25px",
  mobileRowSpace: "5px"
};

const labels = {
  top: -22,
  left: 0
};

export const theme = {
  textColor: color.black,
  color,
  inverse,
  sizes,
  texts,
  sidebar,
  lists,
  filter,
  bigtag,
  preview,
  card,
  create,
  signup,
  font,
  forms,
  labels,
  lightBoxTheme,
  borderColor: color.grey
};
