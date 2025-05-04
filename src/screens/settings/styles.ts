import { StyleSheet } from 'react-native'
import themes from '../../themes'
import colors from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 4,
    padding: 8,
    backgroundColor: '#ffffff10',
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#ffffff10',
    padding: 12,
    borderRadius: 12,
    minWidth: 32,
  },
  text: {
    color: colors.white,
  },
})

export { styles }
