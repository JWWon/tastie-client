import React from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HistoryCard, {HistoryEmpty} from '@components/atoms/HistoryCard';
import {addEmptyRecommendations} from '@store/actions/history';
import {RootState} from '@store/reducers';
import * as s from './History.style';

let endReachCall: any;

const History: React.FC = () => {
  const {recommendations} = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();

  function handleEndReach() {
    if (!endReachCall) {
      endReachCall = setTimeout(() => {
        dispatch(addEmptyRecommendations());
        endReachCall = false;
      }, 240);
    }
  }

  return (
    <s.Container>
      <FlatList
        data={recommendations}
        ListHeaderComponent={
          <s.HeaderWrapper>
            <s.TextHighlight message="내 <b>히스토리</b>" />
          </s.HeaderWrapper>
        }
        renderItem={({item}) =>
          typeof item === 'string' ? (
            <HistoryEmpty id={item} />
          ) : (
            <HistoryCard {...item} />
          )
        }
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.05}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, idx) => idx.toString()}
      />
    </s.Container>
  );
};

export default History;
