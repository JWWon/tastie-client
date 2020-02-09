import React from 'react';
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
} from '@store/actions/case';
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
    locations,
    situations,
    category,
    location,
    situation,
    preference,
    hasRequired,
  } = useSelector((state: RootState) => state.case);

  const preferenceExist = preference !== undefined;

  function categoryDidMount() {
    dispatch(clearCase());
  }

  function switchPage() {
    dispatch(getRecommend.request(navigation));
  }

  const handlePressMore = () => dispatch(selectPreference({preference: ''}));

  const handleSelectCategory: SelectAutocomplete = ({name}) =>
    dispatch(selectCategory({category: name, onPress: switchPage}));

  const handleSelectLocation: SelectAutocomplete = value => {
    dispatch(selectLocation.request({...value, onPress: switchPage}));
  };

  const handleSelectSituation: SelectAutocomplete = ({name}) =>
    dispatch(selectSituation({situation: name, onPress: switchPage}));

  const handleSelectPreference: SelectAutocomplete = ({name}) =>
    dispatch(selectPreference({preference: name}));

  return (
    <s.Home>
      <Sentence message="<b>Anna</b>야," />
      <Sentence
        leadMessage="오늘 "
        maxSize={3}
        message="은"
        editable={false}
        autocomplete={{
          data: categories,
          onSelect: handleSelectCategory,
        }}
        value={category}
        onLayout={categoryDidMount}
      />
      {category !== '' && (
        <Sentence
          maxSize={12}
          message="에서"
          autocomplete={{
            data: [{name: MY_LOCATION, isDefault: true}, ...locations],
            onSelect: handleSelectLocation,
          }}
          placeholder={location.address}
          value={location.name}
        />
      )}
      {location.name !== '' && (
        <Sentence
          maxSize={12}
          message="이야."
          autocomplete={{
            data: situations,
            onSelect: handleSelectSituation,
          }}
          editable={false}
          value={situation}
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
                leadMessage: '왠지 ',
                maxSize: 8,
                message: '한게',
                editable: false,
                autocomplete: {
                  data: [
                    {name: '매콤한'},
                    {name: '느끼한'},
                    {name: '자극적인'},
                    {name: '깔끔한'},
                  ],
                  onSelect: handleSelectPreference,
                },
                value: preference,
              },
              {
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
