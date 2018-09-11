const color = {
  primary: "#F92672",
  warning: "#ffbf00",
  danger: "#ff2e00",
  success: "#85cc00",
  info: "#378bff",
  black: "#0e1800",
  borderActiveColor: '#F92672',
  backgroundLight: "#f5f7fb",
  background: "#dadada",
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
    fontfamily: "Roboto Mono"
  },
  userphoto: {
    height: "110px",
    width: "120px",
    background: "#32363D",
    borderColor: "#DBDBDB",
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
  background: "#F9F9FB",
  borderColor: "#DBDBDB"
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
  scrollBottomSeparation: 15,
  itemSeparation: 15
};

const texts = {
  title: {
    fontFamily: "Helvetica Neue LT Std"
  },
  fontFamily: "Roboto Mono"
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
  create,
  borderColor: color.grey
};
