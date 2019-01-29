import React from 'react'
import List from '../list'
import Sinister from './item'

const SinistersList = props => (
  <List
    renderItem={({ item }) => <Sinister {...item} navigation={props.navigation} />}
    keyExtractor={(item) => item.num_siniestro}
    {...props}
  />
)

export default SinistersList
