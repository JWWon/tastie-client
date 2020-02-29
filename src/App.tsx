import 'react-native-gesture-handler';
import '@react-native-firebase/analytics';
import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import theme from '@styles/theme';
import Navigator from './navigations';
import {configStore} from './store';

const store = configStore();

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Navigator />
    </ThemeProvider>
  </Provider>
);

export default App;
