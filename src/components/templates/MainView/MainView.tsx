import React from 'react';

import Navbar from '@components/molcules/Navbar';
import * as style from './MainView.style';

interface Props {
  contentType: 'full' | 'fit';
}

const Container: React.FC<Props> = props => {
  const ContentWrapper =
    props.contentType === 'full' ? style.ContentFull : style.ContentFit;

  return (
    <style.Container>
      <style.SafeAreaView>
        <ContentWrapper>{props.children}</ContentWrapper>
        <style.NavWrapper>
          <Navbar />
        </style.NavWrapper>
      </style.SafeAreaView>
    </style.Container>
  );
};

export default Container;
