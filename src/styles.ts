import NativeTachyons, { styles } from 'react-native-style-tachyons'
import { StyleSheet } from 'react-native'

NativeTachyons.build({
  rem: 16,

  colors: {
    palette: {}
  }
}, StyleSheet)

const colors = {}

const layout = {}

export {
  styles,
  styles as s,

  colors,
  colors as c,

  layout,
  layout as l
}
