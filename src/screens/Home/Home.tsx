import React from 'react';

import MainView from '@components/templates/MainView';
import TextInput from '@components/molcules/TextInput';

const Home: React.FC = () => (
  <MainView contentType="fit">
    <TextInput
      leadMessage="오늘 "
      maxSize={3}
      message="은,"
      placeholder="I really wanna type korean.."
    />
    <TextInput
      maxSize={12}
      message="에서"
      autocomplete={['내 위치', '지도에서 선택']}
      onPress={() => {}}
    />
  </MainView>
);

export default Home;
