import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, TextInput, Keyboard} from 'react-native';
import firebase from '@react-native-firebase/app';

import Sentence from '@components/molcules/Sentence';
import MoreButton from '@components/atoms/MoreButton';
import {Props as SentenceProps} from '@components/molcules/Sentence';
import {SelectAutocomplete} from '@components/atoms/InputHelper';
import {RootState} from '@store/reducers';
import {
  selectCategory,
  selectSituation,
  selectPreference,
  selectLocation,
  clearCasePartly,
  searchLocations,
  getPreferences,
} from '@store/actions/case';
import {setNavigation} from '@utils/RootService';
import {CaseIndex} from '@store/reducers/case';
import {RootNavigationProp} from '@navigations/Root';
import {SCREEN, EVENT, LOCATION} from '@utils/consts';
import * as s from './Case.style';

interface Props {
  navigation: RootNavigationProp<typeof SCREEN.CASE>;
}

const Case: React.FC<Props> = ({navigation}) => {
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const locationInputRef = useRef<TextInput>();
  // useSelector
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

  const handlePressMore = () => dispatch(getPreferences.request());
  const handleClearPartly = (index: number) => {
    dispatch(clearCasePartly(index));
    firebase.analytics().logEvent(EVENT.CLEAR_CASE_PARTLY, {index});
  };

  const handleSearchLocation = (value: string) =>
    dispatch(searchLocations.request({input: value}));
  const handleSelectCategory: SelectAutocomplete = ({name}) =>
    dispatch(selectCategory({category: name}));
  const handleSelectLocation: SelectAutocomplete = value => {
    if (value.name === LOCATION.SEARCH) {
      locationInputRef.current?.focus();
      firebase.analytics().logEvent(EVENT.PRESS_LOCATION_SEARCH);
      return;
    }
    dispatch(selectLocation.request({...value}));
    Keyboard.dismiss();
  };
  const handleSelectSituation: SelectAutocomplete = ({name}) =>
    dispatch(selectSituation({situation: name}));
  const handleSelectPreference: SelectAutocomplete = ({name}) =>
    dispatch(selectPreference({preference: name}));

  useEffect(() => setNavigation(navigation), []);

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
        onPress={() => handleClearPartly(CaseIndex.CATEGORY)}
      />
      {category !== '' && (
        <Sentence
          message="에서"
          autocomplete={{
            data: [
              {name: LOCATION.MY_LOCATION, isDefault: true},
              {name: LOCATION.SEARCH, isDefault: true},
              ...(searchedLocations.length > 0
                ? searchedLocations
                : nearbyLocations),
            ],
            onSelect: handleSelectLocation,
          }}
          placeholder={location.address}
          value={location.name}
          onPress={() => handleClearPartly(CaseIndex.LOCATION)}
          onChangeText={handleSearchLocation}
          inputRef={locationInputRef}
        />
      )}
      {location.name !== '' && (
        <Sentence
          maxSize={11}
          message="(이)야."
          autocomplete={{
            data: situations,
            onSelect: handleSelectSituation,
          }}
          value={situation}
          onPress={() => handleClearPartly(CaseIndex.SITUATION)}
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
                maxSize: 10,
                message: '걸',
                autocomplete: {
                  data: preferences,
                  onSelect: handleSelectPreference,
                },
                value: preference,
                onPress: () => handleClearPartly(CaseIndex.PREFERENCE),
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
