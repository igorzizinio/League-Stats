import { StyleSheet } from 'react-native'
import themes from '../../themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  subTitle: {
    color: '#ffffff60',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputsContainer: {
    backgroundColor: '#ffffff10',
    flexDirection: 'row',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#ffffff50',
    borderBottomWidth: 1,
    width: '75%',
  },
  textInput: {
    color: '#ffffff90',
    padding: 12,
    fontSize: 18,
    width: '75%',
  },
  button: {
    backgroundColor: '#ffffff10',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export { styles }
