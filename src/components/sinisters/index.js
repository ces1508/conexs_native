import React from 'react'
import List from '../list'
import Sinister from './item'

const SinistersList = props => (
  <List
    renderItem={({ item }) => <Sinister {...item} navigation={props.navigation} sinister={item} />}
    keyExtractor={(item) => item.num_siniestro}
    {...props}
  />
)

export default SinistersList
