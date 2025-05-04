import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { styles } from './styles'

interface Item {
  text: string
  key: string
  data: unknown
}

interface Props {
  text: string
  open: boolean
  styles?: StyleProp<ViewStyle>
  items: Item[]
  onPress: () => unknown
  onSelect: (item: Item) => unknown
}

const SelectMenu: React.FC<Props> = ({
  text,
  open,
  items,
  onPress,
  onSelect,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.styles]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>{text}</Text>
        <MaterialIcons
          name={open ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          size={32}
          color='#ffffff70'
        />
      </View>

      {open ? (
        <View>
          {items.map((item) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              key={item.key}
            >
              <Text style={styles.subText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

export { SelectMenu }
