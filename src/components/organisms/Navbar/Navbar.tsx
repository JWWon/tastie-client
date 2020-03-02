import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import TabBar from '@components/atoms/TabBar';
import Message from '@components/molcules/Message';
import {RootState} from '@store/reducers';
import {contractNavbar} from '@store/actions/navbar';
import Dismiss from '@components/atoms/Dismiss';
import * as s from './Navbar.style';
import {Platform} from 'react-native';

const Navbar: React.FC = () => (
  <s.Wrapper>
    <Message />
    <TabBar />
  </s.Wrapper>
);

const NavbarContainer: React.FC = () => {
  const {expand} = useSelector((state: RootState) => state.navbar);

  const dispatch = useDispatch();

  function handleDismiss() {
    dispatch(contractNavbar());
  }

  return expand ? (
    <>
      {Platform.OS === 'ios' && <s.ModalBlur />}
      <s.ModalTouch onPress={handleDismiss}>
        <s.ModalSafeView>
          <Dismiss icon="close" onPress={handleDismiss} />
        </s.ModalSafeView>
        <Navbar />
      </s.ModalTouch>
    </>
  ) : (
    <Navbar />
  );
};

export default NavbarContainer;
