import NativeTachyons, { styles } from 'react-native-style-tachyons'
import { StyleSheet } from 'react-native'
import { variables } from 'native-base'

NativeTachyons.build({
  rem: 16,

  colors: {
    palette: {}
  }
}, StyleSheet)

const colors = {
  success: variables.brandSuccess,
  danger: variables.brandDanger,
  warning: variables.brandWarning
}

const layout = {}

export {
  styles,
  styles as s,

  colors,
  colors as c,

  layout,
  layout as l
}
