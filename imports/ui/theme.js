const color = {
  primary: '#F92672',
  warning: '#ffbf00',
  danger: '#ff2e00',
  success: '#85cc00',
  info: '#378bff',
  black: '#0e1800',
  backgroundLight: '#f5f7fb',
  background: '#dadada',
  default: '#d3dee3',
  grey: '#dbdbdb'
}

const inverse = {
  primary: '#FFFFFF',
  warning: '#FFFFFF',
  danger: '#FFFFFF',
  success: '#FFFFFF',
  info: '#FFFFFF',
  default: color.black
}

const sizes = {
  phone: 376,
  tablet: 768,
  desktop: 992,
  giant: 1170
}

export const theme = {
  textColor: color.black,
  color,
  inverse,
  sizes,
  borderColor: color.grey
}
