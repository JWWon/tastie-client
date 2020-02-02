import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useDispatch} from 'react-redux';

import {updateHomeHeight} from '@store/actions/device';
import * as s from './Home.style';

interface Props {
  [option: string]: any;
}

const Template: React.FC<Props> = ({children, ...options}) => {
  const dispatch = useDispatch();

  function layoutDidMount(e: LayoutChangeEvent) {
    const {height: homeHeight} = e.nativeEvent.layout;
    dispatch(updateHomeHeight({homeHeight}));
  }

  return (
    <s.FullScreen>
      <s.Container>
        <s.ContentWrapper onLayout={layoutDidMount} {...options}>
          {children}
        </s.ContentWrapper>
        <s.NavbarArea />
      </s.Container>
    </s.FullScreen>
  );
};

export default Template;
