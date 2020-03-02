import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import Sentence from '@components/molcules/Sentence';
import MoreButton from '@components/atoms/MoreButton';
import {Props as SentenceProps} from '@components/molcules/Sentence';
import {SelectAutocomplete} from '@components/atoms/InputHelper';
import {RootState} from '@store/reducers';
import {getRecommendation} from '@store/actions/recommendation';
import {
  selectCategory,
  selectSituation,
  selectPreference,
  selectLocation,
  clearCasePartly,
  searchLocations,
  getPreferences,
} from '@store/actions/case';
import {CaseIndex} from '@store/reducers/case';
import {HomeParamList} from '@navigations/Home';
import {MY_LOCATION} from '@utils/consts';
import * as s from './Case.style';

interface Props {
  navigation: BottomTabNavigationProp<HomeParamList, 'Case'>;
}

const Case: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    categories,
    nearbyLocations,
    searchedLocations,
    situations,
    preferences,
    category,
    location,
    situation,
    preference,
    hasRequired,
  } = useSelector((state: RootState) => state.case);

  const preferenceExist = preference !== undefined;

  const searchRecommend = () => dispatch(getRecommendation.request(navigation));

  const handlePressMore = () => dispatch(getPreferences.request());

  const handleSearchLocation = (value: string) =>
    dispatch(searchLocations.request({input: value}));
  const handleSelectCategory: SelectAutocomplete = ({name}) =>
    dispatch(selectCategory({category: name, onPress: searchRecommend}));
  const handleSelectLocation: SelectAutocomplete = value =>
    dispatch(selectLocation.request({...value, onPress: searchRecommend}));
  const handleSelectSituation: SelectAutocomplete = ({name}) =>
    dispatch(selectSituation({situation: name, onPress: searchRecommend}));
  const handleSelectPreference: SelectAutocomplete = ({name}) =>
    dispatch(selectPreference({preference: name}));

  return (
    <s.Container>
      <Sentence
        leadMessage="오늘 "
        maxSize={3}
        message="은(는)"
        autocomplete={{
          data: categories,
          onSelect: handleSelectCategory,
        }}
        value={category}
        onPress={() => dispatch(clearCasePartly(CaseIndex.CATEGORY))}
      />
      {category !== '' && (
        <Sentence
          message="에서"
          autocomplete={{
            data: [
              {name: MY_LOCATION, isDefault: true},
              ...(searchedLocations.length > 0
                ? searchedLocations
                : nearbyLocations),
            ],
            onSelect: handleSelectLocation,
          }}
          placeholder={location.address}
          value={location.name}
          onPress={() => dispatch(clearCasePartly(CaseIndex.LOCATION))}
          onChangeText={handleSearchLocation}
        />
      )}
      {location.name !== '' && (
        <Sentence
          maxSize={11}
          message="이야."
          autocomplete={{
            data: situations,
            onSelect: handleSelectSituation,
          }}
          value={situation}
          onPress={() => dispatch(clearCasePartly(CaseIndex.SITUATION))}
        />
      )}
      {hasRequired && !preferenceExist && (
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
                leadMessage: '나는 ',
                maxSize: 8,
                message: '걸',
                autocomplete: {
                  data: preferences,
                  onSelect: handleSelectPreference,
                },
                value: preference,
                onPress: () => dispatch(clearCasePartly(CaseIndex.PREFERENCE)),
              },
              {
                message: '좋아해.',
              },
            ]}
            renderItem={({item}) => <Sentence {...item} />}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </s.MoreSentenceWrapper>
      )}
    </s.Container>
  );
};

export default Case;
