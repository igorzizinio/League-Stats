import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    top: '64%',
    fontSize: 8,
  },
})

export default styles
