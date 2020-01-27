import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MainView from '@components/templates/MainView';
import TextInput from '@components/molcules/TextInput';
import {Props as HelperProps} from '@components/atoms/HelperRow';
import {RootState} from '@store/reducers';
import {updateCase} from '@store/actions/situation';

const Home: React.FC = () => {
  const {mealType} = useSelector((state: RootState) => state.situation);
  const dispatch = useDispatch();

  const handleSelect: HelperProps['onSelect'] = (value: string) => {
    dispatch(updateCase({mealType: value}));
  };

  return (
    <MainView contentType="fit">
      <TextInput
        leadMessage="오늘 "
        maxSize={3}
        message="은,"
        editable={false}
        autocomplete={['저녁', '야식', '술자리']}
        onSelect={handleSelect}
        value={mealType}
      />
    </MainView>
  );
};

export default Home;
