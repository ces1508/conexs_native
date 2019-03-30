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
      <Text
        numberOfLines={2}
        textBreakStrategy='highQuality'
        ellipsizeMode='tail'
        style={[styles.text, styles.value]}>
        {` ${props.value}`}
      </Text>
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    paddingLeft: 12,
    fontWeight: 'normal'
  }
})

export default Description
