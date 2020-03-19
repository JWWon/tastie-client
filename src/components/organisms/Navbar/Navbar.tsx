import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Modal from '@components/templates/Modal';
import TabBar from '@components/atoms/TabBar';
import Message from '@components/molcules/Message';
import {RootState} from '@store/reducers';
import {contractNavbar} from '@store/actions/navbar';
import * as s from './Navbar.style';

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
    <Modal onDismiss={handleDismiss}>
      <Navbar />
    </Modal>
  ) : (
    <Navbar />
  );
};

export default NavbarContainer;
