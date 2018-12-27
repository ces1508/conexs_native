import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const Poliza = props => (
  <View style={styles.container}>
    <View style={styles.containerImage}>
      <Image source={{ uri: 'https://picsum.photos/320/320?image=0' }} style={{ height: 60, width: 60 }} />
    </View>
    <View style={styles.containerText}>
      <Text style={styles.text}>Estado:
        <Text style={props.estado === 'ACTIVO' ? styles.activo : styles.inactivo}>
          { props.estado }
        </Text>
      </Text>
      <Text style={styles.text}>Poliza: {props.poliza}</Text>
      <Text style={styles.text}>Placa: {props.placas}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    paddingVertical: 10
  },
  containerImage: {
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  containerText: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    color: '#000'
  },
  activo: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 5
  },
  inactivo: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 5
  }
})

export default Poliza
