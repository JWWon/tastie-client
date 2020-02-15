import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import axios from '@services/axios.base';
import theme from '@styles/theme';
import Navigator from './navigations';
import {configStore} from './store';

const store = configStore();

class App extends Component {
  constructor(props: {}) {
    super(props);
    axios.config();
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
