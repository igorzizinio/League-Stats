import React from 'react'
import { Text, TextProps } from 'react-native'
import styles from './styles'

export interface TitleProps extends TextProps {}

const Title: React.FC<TitleProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Title
