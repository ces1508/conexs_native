import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

const theme = {
  colors: {
    blue: '#243E78',
    yellow: '#AF6209',
    white: '#fff',
    lightBlue: '#012b95',
    button: '#d5802d',
    shadowButton: '#854200',
    normalText: '#000',
    textOverBackground: '#fff'
  },
  sizes: {
    title: 30,
    subTitle: 22,
    text: 17,
    height,
    width
  }
}

export default theme
