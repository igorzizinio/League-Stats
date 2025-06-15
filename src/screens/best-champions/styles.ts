import { StyleSheet } from 'react-native'

import colors from '../../colors'
import themes from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontWeight: 'bold',
  },
  maestries: {
    width: '100%',
  },
})

export { styles }
