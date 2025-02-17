import colors from './colors'

const accentColors = [
  colors.softViolet,
  colors.softCyan,
  colors.softRed,
  colors.softOrange,
  colors.softBlue,
  colors.softGreen,
  colors.softYellow,
  colors.softPink,
  colors.softTeal,
  colors.softPurple,
  colors.softLime,
  colors.softMagenta,
]

const primary = accentColors[Math.floor(Math.random() * accentColors.length)]

export default {
  dark: {
    background: colors.darkGrey,
    primary: primary,
    surface: '#ffffff05',
    text: colors.white,
  },
}
