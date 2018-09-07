const color = {
  primary: "#F92672",
  warning: "#ffbf00",
  danger: "#ff2e00",
  success: "#85cc00",
  info: "#378bff",
  black: "#0e1800",
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

const lists = {
  scrollSeparation: 15,
  scrollBottomSeparation : 15,
  itemSeparation: 15
}

const texts = {
  title:{
    fontFamily: 'Helvetica Neue LT Std'
  },
  fontFamily: 'Roboto Mono'
}

export const theme = {
  textColor: color.black,
  color,
  inverse,
  sizes,
  texts,
  sidebar,
  lists,
  borderColor: color.grey
};