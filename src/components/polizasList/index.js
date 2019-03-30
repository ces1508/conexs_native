import React from 'react'
import List from '../list'
import Poliza from '../poliza'
import { View } from 'react-native'
import Empty from '../emptyList'
const PolizasList = props => (
  <List
    keyExtractor={(item) => item.poliza}
    height={0.1}
    ItemSeparatorComponent={() => <Separator />}
    ListEmptyComponent={<Empty />}
    renderItem={({ item }) => <Poliza {...item} navigation={props.navigation} />}
    {...props}
  />
)

export default PolizasList

const Separator = props => (<View style={{ height: 1, backgroundColor: 'gray' }} />)
