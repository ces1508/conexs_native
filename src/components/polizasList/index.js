import React from 'react'
import List from '../list'
import Poliza from '../poliza'
import { View } from 'react-native'

const PolizasList = props => (
  <List
    keyExtractor={(item) => item.poliza}
    data={props}
    {...props}
    height={0.1}
    ItemSeparatorComponent={() => <Separator />}
    renderItem={({ item }) => <Poliza {...item} navigation={props.navigation} />}
  />
)

export default PolizasList

const Separator = props => (<View style={{ height: 1, backgroundColor: 'gray' }} />)
