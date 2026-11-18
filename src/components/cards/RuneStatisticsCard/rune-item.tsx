import React, { memo, useMemo } from 'react'
import { View, Image, Text } from 'react-native'
import { PerkStyleSelection } from '../../../@types/riot'
import { formatRuneStatistic } from '../../../functions/formatRuneStatistic'
import cdragon, { CommunityDragonPerk } from '../../../services/cdragon'
import { styles } from './styles'

export const RuneItem = memo(function RuneItem({
  rune,
  selection,
  locale,
  compact = false,
}: {
  rune: CommunityDragonPerk
  selection?: PerkStyleSelection
  locale?: string
  compact?: boolean
}) {
  const statistic = useMemo(
    () =>
      selection
        ? formatRuneStatistic(
            rune,
            [selection.var1, selection.var2, selection.var3],
            locale,
          )
        : undefined,
    [rune, selection, locale],
  )

  return (
    <View style={compact ? styles.compactRune : styles.rune}>
      <Image
        resizeMode='contain'
        accessibilityLabel={rune.name}
        style={compact ? styles.compactIcon : styles.icon}
        source={{ uri: cdragon.getPerkIconUrl(rune.iconPath) }}
      />
      {!compact && (
        <View style={styles.runeTextContainer}>
          <Text style={styles.runeText}>{rune.name}</Text>
          {statistic && <Text style={styles.statisticText}>{statistic}</Text>}
        </View>
      )}
    </View>
  )
})
