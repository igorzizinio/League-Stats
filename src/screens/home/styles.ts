import { StyleSheet } from 'react-native'
import themes from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    padding: 8,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

export { styles }
