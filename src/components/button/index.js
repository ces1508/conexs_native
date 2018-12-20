import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TouchableOpacity
} from 'react-native'

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      <Text style={props.textStyle}>{props.text}</Text>
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
