import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import theme from '../../theme'
const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress} {...props}
      style={[styles.main, props.buttonStyles]}
    >
      <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default Button

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
Button.defaultProps = {
  text: 'send prop text to change it',
  onPress: () => console.warn('send prop onPress to handle it')
}
const styles = StyleSheet.create({
  main: {
    borderTopColor: theme.colors.shadowButton,
    borderTopWidth: 3,
    marginTop: 20,
    backgroundColor: theme.colors.button,
    height: 70,
    borderRadius: 7
  },
  buttonText: {
    color: theme.colors.shadowButton,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
    fontSize: theme.sizes.subTitle
  }
})
