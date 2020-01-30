import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MainView from '@components/templates/MainView';
import TextInput from '@components/molcules/TextInput';
import MoreButton from '@components/atoms/MoreButton';
import {Props as HelperProps} from '@components/atoms/HelperRow';
import {RootState} from '@store/reducers';
import {
  updateCategory,
  updatePlace,
  updateSituation,
} from '@store/actions/case';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const {category, place, situation} = useSelector(
    (state: RootState) => state.case,
  );

  const [showMore, setShowMore] = useState<boolean>(false);

  const categoryExist = category !== '';
  const placeExist = place !== '';
  const situationExist = situation !== '';

  const handleSelectCategory: HelperProps['onSelect'] = (value: string) => {
    dispatch(updateCategory({category: value}));
  };

  const handleSelectPlace: HelperProps['onSelect'] = (value: string) => {
    dispatch(updatePlace({place: value}));
  };

  const handleSelectSituation: HelperProps['onSelect'] = (value: string) => {
    dispatch(updateSituation({situation: value}));
  };

  const handlePressMore = () => {
    setShowMore(true);
  };

  return (
    <MainView contentType="fit">
      <TextInput
        leadMessage="오늘 "
        maxSize={3}
        message="은,"
        editable={false}
        autocomplete={[{name: '저녁'}, {name: '야식'}, {name: '술자리'}]}
        onSelect={handleSelectCategory}
        value={category}
      />
      {categoryExist && (
        <TextInput
          maxSize={12}
          message="에서"
          autocomplete={[{name: '내 위치'}, {name: '지도에서 선택'}]}
          placeholder={
            place === '내 위치' ? '서울특별시 이태원로 22' : undefined
          }
          onSelect={handleSelectPlace}
          value={place}
        />
      )}
      {placeExist && (
        <TextInput
          maxSize={12}
          message="이야."
          autocomplete={[
            {name: '오랜 친구와의 약속'},
            {name: '소개팅'},
            {name: '대학 친구들과의 회식'},
            {name: '데이트'},
          ]}
          onSelect={handleSelectSituation}
          value={situation}
        />
      )}
      {categoryExist && placeExist && situationExist && !showMore && (
        <MoreButton
          marginTop={28}
          message="더 알려주기"
          onPress={handlePressMore}
        />
      )}
    </MainView>
  );
};

export default Home;
