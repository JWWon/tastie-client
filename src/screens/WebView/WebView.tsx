import React from 'react';

import Dismiss from '@components/atoms/Dismiss';
import BaseView from '@components/templates/BaseView';
import {Props} from './WebView.type';
import * as s from './WebView.style';

const WebView: React.FC<Props> = ({navigation, route}) => {
  const {uri} = route.params;

  return (
    <BaseView noWrapper>
      <s.Container>
        <s.WebViewWrapper>
          <s.WebView source={{uri}} />
        </s.WebViewWrapper>

        <Dismiss absolute icon="arrow" onPress={() => navigation.goBack()} />
      </s.Container>
    </BaseView>
  );
};

export default WebView;
