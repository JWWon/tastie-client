import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import Sentence from '@components/molcules/Sentence';
import MoreButton from '@components/atoms/MoreButton';
import {Props as SentenceProps} from '@components/molcules/Sentence';
import {SelectAutocomplete} from '@components/atoms/HelperRow';
import {RootState} from '@store/reducers';
import {getRecommend} from '@store/actions/recommend';
import {
  selectCategory,
  selectSituation,
  selectPreference,
  selectLocation,
  clearCase,
  clearCasePartly,
  searchLocations,
} from '@store/actions/case';
import {CaseIndex} from '@store/reducers/case';
import {HomeParamList} from '@navigations/Home';
import consts from '@utils/consts';
import * as s from './Case.style';

const {MY_LOCATION} = consts;

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

  const searchRecommend = () => dispatch(getRecommend.request(navigation));

  const handlePressMore = () => dispatch(selectPreference({preference: ''}));

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

  useEffect(() => {
    dispatch(clearCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <s.Home>
      <Sentence message="<b>Anna</b>야," />
      <Sentence
        leadMessage="오늘 "
        maxSize={3}
        message="은"
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
          maxSize={10}
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
    </s.Home>
  );
};

export default Case;
