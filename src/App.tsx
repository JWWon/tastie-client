import 'react-native-gesture-handler';
import '@react-native-firebase/analytics';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import firebase from '@react-native-firebase/app';
import {ThemeProvider} from 'styled-components';
import DeviceInfo from 'react-native-device-info';

import axios from '@services/axios.base';
import theme from '@styles/theme';
import Navigator from './navigations';
import {configStore} from './store';

const store = configStore();

async function configAnalytics() {
  // SET USER ID
  const uuid = DeviceInfo.getUniqueId();
  firebase.analytics().setUserId(uuid);

  if (__DEV__) {
    firebase.analytics().resetAnalyticsData();
    firebase.analytics().setAnalyticsCollectionEnabled(false);
  } else {
    firebase.analytics().logAppOpen();
  }
}

class App extends Component {
  constructor(props: {}) {
    super(props);
    axios.config();
    configAnalytics();
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigator />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
