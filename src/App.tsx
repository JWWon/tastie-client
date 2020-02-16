import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';
import {ThemeProvider} from 'styled-components';

import axios from '@services/axios.base';
import theme from '@styles/theme';
import Navigator from './navigations';
import {configStore} from './store';

const store = configStore();

function configAnalytics() {
  if (__DEV__) {
    firebase.analytics().resetAnalyticsData();
    firebase.analytics().setUserId('DEVELOP');
  }
  firebase.analytics().logAppOpen();
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
