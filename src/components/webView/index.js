import React from 'react'
import {
  WebView,
  View
} from 'react-native'

const RenderHtml = props => {
  return (
    <View style={{ marginTop: 20, height: 150 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: props.html }}
        utomaticallyAdjustContentInsets
        mixedContentMode='always'
        style={{ height: 100, width: 200 }}
      />
    </View>
  )
}

export default RenderHtml
