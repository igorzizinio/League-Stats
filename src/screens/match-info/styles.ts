import { StyleSheet } from 'react-native'
import themes from '../../themes'
import colors from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    padding: 8,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  teamsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  team: {
    flex: 1,
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#ffffff80',
  },
  button: {
    backgroundColor: '#ffffff05',
    padding: 12,
    borderRadius: 8,
  },
})

const mdStyles = StyleSheet.create({
  text: {
    color: '#ffffff80',
  },
  list_item: {
    color: '#ffffff80',
  },
  hr: {
    backgroundColor: '#ffffff20',
    marginVertical: 8,
  },
})

export { styles, mdStyles }
