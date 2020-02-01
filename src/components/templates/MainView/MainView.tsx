import React from 'react';

import Navbar from '@components/molcules/Navbar';
import * as s from './MainView.style';

interface Props {
  contentType: 'full' | 'fit';
}

const Container: React.FC<Props> = props => {
  const ContentWrapper =
    props.contentType === 'full' ? s.ContentFull : s.ContentFit;

  return (
    <s.Container>
      <s.SafeAreaView>
        <ContentWrapper>{props.children}</ContentWrapper>
        <s.NavWrapper>
          <Navbar />
        </s.NavWrapper>
      </s.SafeAreaView>
    </s.Container>
  );
};

export default Container;
