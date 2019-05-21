import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

const Card = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image source={props.image} style={styles.image} />
        </View>
        <View style={styles.containerText}>
          {props.children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

Card.defaultProps = {
  onPress: () => null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10
  },
  containerImage: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 50,
    overflow: 'hidden'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default Card
