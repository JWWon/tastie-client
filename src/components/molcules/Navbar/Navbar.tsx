import React from 'react';

import * as s from './Navbar.style';
import NavButton from '@components/atoms/NavButton';
import Message from '@components/atoms/Message';

const Navbar: React.FC = () => (
  <s.Wrapper>
    <Message message="테스트에용" />
    <NavButton />
  </s.Wrapper>
);

export default Navbar;
