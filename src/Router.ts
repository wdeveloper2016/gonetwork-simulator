import { createStackNavigator } from 'react-navigation';

import Config      from './screens/config';

const BaseNavigation = createStackNavigator({
  Config:           { screen: Config },
}, {
  headerMode: 'none',
});

export default BaseNavigation;
