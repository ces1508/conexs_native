import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import theme from '../../theme'

const Description = props => {
  if (props.clickable) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Body {...props} />
      </TouchableOpacity>
    )
  }
  return <Body {...props} />
}

const Body = props => (
  <View style={styles.container}>
    <Text
      style={[styles.text, styles.title]}>
      {props.title}:
    </Text>
    <Text
      style={[styles.text, styles.value]}>
      {props.value}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 8
  },
  text: {
    fontSize: theme.sizes.text,
    color: theme.colors.normalText
  },
  title: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 8,
    fontWeight: 'normal'
  }
})

export default Description
