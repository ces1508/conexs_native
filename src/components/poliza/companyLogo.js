import React from 'react'
import axa from '../../img/logos/axa-colpatria.png'
import bolivar from '../../img/logos/bolivar.png'
import confianza from '../../img/logos/confianza.png'
import liberty from '../../img/logos/liberty.png'
import mapfre from '../../img/logos/mapfre.png'
import medicos from '../../img/logos/medicos.png'
import mundial from '../../img/logos/mundial.png'
import previsora from '../../img/logos/previsora.png'
import sbs from '../../img/logos/sbs.png'
import solidaria from '../../img/logos/solidaria.png'
import sura from '../../img/logos/sura.png'
import estado from '../../img/logos/estado.png'
import allianz from '../../img/logos/allianz.jpg'
import equidad from '../../img/logos/equidad.png'
// import getImage from '.././img/logos'

import { View, StyleSheet, Image } from 'react-native'

const getLogoByText = text => {
  if (text.includes('axa')) {
    return axa
  }
  if (text.includes('bolivar')) {
    return bolivar
  }
  if (text.includes('confianza')) {
    return confianza
  }
  if (text.includes('liberty')) {
    return liberty
  }
  if (text.includes('mapfre')) {
    return mapfre
  }
  if (text.includes('medico')) {
    return medicos
  }
  if (text.includes('previsora')) {
    return previsora
  }
  if (text.includes('sbs')) {
    return sbs
  }
  if (text.includes('solidaria')) {
    return solidaria
  }
  if (text.includes('sura')) {
    return sura
  }
  if (text.includes('estado')) {
    return estado
  }
  if (text.includes('mundial')) {
    return mundial
  }
  if (text.includes('allianz')) {
    return allianz
  }
  if (text.includes('equidad')) {
    return equidad
  }
}

const Logo = props => {
  let company = props.company.toLowerCase()
  return (
    <View>
      <Image
        resizeMode='contain'
        style={[
          styles.image,
          { backgroundColor: company.includes('bolivar') ? 'green' : 'white' }
        ]}
        source={getLogoByText(company)} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
  }
})

export default Logo
