import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import network from '@services/axios.base';
import theme from '@styles/theme';
import Navigator from './navigations';
import {configStore} from './store';

const App: React.FC = () => {
  const store = configStore();

  useEffect(() => {
    network.init();
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
