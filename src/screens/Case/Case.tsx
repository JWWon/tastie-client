import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {NavigationTabScreenProps} from 'react-navigation-tabs';

import Sentence from '@components/molcules/Sentence';
import MoreButton from '@components/atoms/MoreButton';
import {Props as SentenceProps} from '@components/molcules/Sentence';
import {Props as HelperProps} from '@components/atoms/HelperRow';
import {RootState} from '@store/reducers';
import {
  updateCategory,
  updatePlace,
  updateSituation,
  updatePreference,
} from '@store/actions/case';
import {updateContent, updateLoading} from '@store/actions/message';
import consts from '@utils/consts';
import * as s from './Case.style';

const {SCREEN} = consts;

const Case: React.FC<NavigationTabScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {category, place, situation, preference} = useSelector(
    (state: RootState) => state.case,
  );

  const categoryExist = category !== '';
  const placeExist = place !== '';
  const situationExist = situation !== '';
  const preferenceExist = preference !== undefined;

  const handleSelectCategory: HelperProps['onSelect'] = (value: string) => {
    dispatch(updateCategory({category: value}));
    dispatch(updateContent({content: '어디서 먹나옹?'}));
  };

  const handleSelectPlace: HelperProps['onSelect'] = (value: string) => {
    dispatch(updatePlace({place: value}));
    dispatch(updateContent({content: '누구랑 먹나옹?'}));
  };

  const handleSelectSituation: HelperProps['onSelect'] = (value: string) => {
    dispatch(updateSituation({situation: value}));
    dispatch(
      updateContent({
        content: '뭐 먹을지 정해줄까옹?',
        onPress: () => {
          navigation.navigate(SCREEN.RECOMMEND);
          dispatch(updateLoading({loading: true}));
        },
      }),
    );
  };

  const handleSelectPreference: HelperProps['onSelect'] = (value: string) => {
    dispatch(updatePreference({preference: value}));
  };

  const handlePressMore = () => {
    dispatch(updatePreference({preference: ''}));
  };

  return (
    <s.Home>
      <Sentence
        leadMessage="오늘 "
        maxSize={3}
        message="은,"
        editable={false}
        autocomplete={[{name: '저녁'}, {name: '야식'}, {name: '술자리'}]}
        onSelect={handleSelectCategory}
        value={category}
      />
      {categoryExist && (
        <Sentence
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
        <Sentence
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
      {categoryExist && placeExist && situationExist && !preferenceExist && (
        <MoreButton
          marginTop={28}
          message="더 알려주기"
          onPress={handlePressMore}
        />
      )}
      {preferenceExist && (
        <s.MoreSentenceWrapper>
          <FlatList<SentenceProps>
            data={[
              {
                leadMessage: '왠지 ',
                maxSize: 8,
                message: '한게',
                editable: false,
                autocomplete: [
                  {name: '매콤한'},
                  {name: '느끼한'},
                  {name: '자극적인'},
                  {name: '깔끔한'},
                ],
                onSelect: handleSelectPreference,
                value: preference,
              },
              {
                maxSize: 0,
                message: '먹고싶어.',
              },
            ]}
            renderItem={({item}) => <Sentence {...item} />}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </s.MoreSentenceWrapper>
      )}
    </s.Home>
  );
};

export default Case;
