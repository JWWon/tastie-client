import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import CaseScreen from '../screens/Case';

const RootNavigator = createSwitchNavigator(
  {
    Case: CaseScreen,
  },
  {
    initialRouteName: 'Case',
  },
);

export default createAppContainer(RootNavigator);
