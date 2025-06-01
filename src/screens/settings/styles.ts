import { StyleSheet } from 'react-native'
import themes from '../../themes'
import colors from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'flex-start',

    padding: 16,
    gap: 32,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 8,
    padding: 8,
    backgroundColor: '#ffffff10',
    borderRadius: 12,
    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff10',
    padding: 12,
    borderRadius: 12,
    minWidth: 72,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.softPurple,
    padding: 12,
    borderRadius: 12,
    minWidth: 32,
  },
  title: {
    fontSize: 24,
    padding: 8,
    fontWeight: 'bold',
    color: colors.white,
  },
  text: {
    fontWeight: 'bold',
    color: colors.white,
  },
})

export { styles }
