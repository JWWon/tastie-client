import React from 'react';

import MainView from '@components/templates/MainView';
import MainText from '@components/atoms/MainText';

const Home: React.FC = () => (
  <MainView contentType="fit">
    <MainText leadMessage="오늘 " message="은," />
  </MainView>
);

export default Home;
