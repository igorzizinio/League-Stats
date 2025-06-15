import { StyleSheet } from 'react-native'
import colors from '../../colors'
import themes from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    paddingVertical: 12,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '95%',
    flexDirection: 'row',
    gap: 12,
  },
  text: {
    color: colors.white,
  },
  inputsContainer: {
    backgroundColor: '#444',
    height: 48,
    width: 256,
    flexDirection: 'row',
  },
})

export { styles }
