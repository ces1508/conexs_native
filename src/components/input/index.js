import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

const Input = props => {
  let anyError = props.errors.filter(error => error.field === props.name)
  return (
    <View>
      <View>
        <Text>{props.label}</Text>
        <TextInput
          onChangeText={props.handleText}
          value={props.value}
          {...props}
        />
      </View>
      <View>
        {anyError.map((error, index) => (
          <Text key={`${props.name}-${index}`}> {error.msg} </Text>
        ))}
      </View>
    </View>
  )
}

Input.propTypes = {
  errors: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleText: PropTypes.func.isRequired
}
Input.defaultProps = {
  errors: [],
  label: 'this is a label input',
  value: '',
  name: 'example',
  handleText: text => console.warn(`{this.name}: ${text}`)
}

const styles = StyleSheet.create({

})

export default Input
