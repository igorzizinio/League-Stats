import { StyleSheet } from 'react-native'
import themes from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchList: {
    width: '100%',
    padding: 8,
  },
  matchListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
})

export { styles }
