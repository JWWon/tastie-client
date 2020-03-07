import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Modal from '@components/templates/Modal';
import {selectLikeIcon} from '@utils/helper';
import {RootState} from '@store/reducers';
import {hideLikesModal, createLike} from '@store/actions/recommendations';
import * as s from './LikesModal.style';

interface Button {
  positive: boolean;
  onPress: () => void;
  message: string;
}

const LikesModal: React.FC = () => {
  const {selectedID} = useSelector((state: RootState) => state.recommendations);
  const dispatch = useDispatch();

  const buttons: Button[] = [
    {
      positive: true,
      onPress: () => dispatch(createLike.request({positive: true})),
      message: '좋아요',
    },
    {
      positive: false,
      onPress: () => dispatch(createLike.request({positive: false})),
      message: '별로에요',
    },
  ];

  function handleDismiss() {
    dispatch(hideLikesModal());
  }

  return selectedID !== undefined ? (
    <Modal onDismiss={handleDismiss}>
      <s.Container>
        {buttons.map((item: Button) => (
          <s.ButtonWrapper key={item.message}>
            <s.Button onPress={item.onPress}>
              <s.Icon source={selectLikeIcon({positive: item.positive})} />
            </s.Button>
            <s.Message>{item.message}</s.Message>
          </s.ButtonWrapper>
        ))}
      </s.Container>
    </Modal>
  ) : null;
};

export default LikesModal;
