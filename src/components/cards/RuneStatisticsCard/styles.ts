import { StyleSheet } from 'react-native'
import colors from '../../../colors'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rune: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactRune: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  compactIcon: {
    width: 28,
    height: 28,
  },
  runeText: {
    color: colors.white,
    fontSize: 13,
  },
  runeTextContainer: {
    flex: 1,
  },
  statisticText: {
    color: '#ffffff60',
    fontSize: 12,
  },
  shards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
})
