import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  // font sizes
  fontSizeBig: 18,
  fontSizeNormal: 14,
  fontSizeSmall: 10,

  // margins
  marginHuge: 36,
  marginBig: 24,
  marginNormal: 16,
  marginSmall: 10,
  marginTiny: 6,

  // frame sizes
  screenWidth,
  screenHeight,
};
