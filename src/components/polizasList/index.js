import React from 'react'
import List from '../list'
import Poliza from '../poliza'

const PolizasList = props => (
  <List
    keyExtractor={(item) => item.poliza}
    data={props}
    {...props}
    height={0.1}
    renderItem={({ item }) => <Poliza {...item} />}
  />
)

export default PolizasList
