import React from 'react';

import * as s from './Navbar.style';
import CatButton from '@components/atoms/CatButton';
import Message from '@components/molcules/Message';

const Navbar: React.FC = () => (
  <s.Wrapper>
    <Message />
    <CatButton />
  </s.Wrapper>
);

export default Navbar;
