import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import HomeScreen from '@screens/Home';

const RootNavigator = createSwitchNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(RootNavigator);
