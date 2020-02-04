import React from 'react';

import * as s from './Navbar.style';
import NavButton from '@components/atoms/NavButton';
import Message from '@components/molcules/Message';

const Navbar: React.FC = () => (
  <s.Wrapper>
    <Message />
    <NavButton />
  </s.Wrapper>
);

export default Navbar;
