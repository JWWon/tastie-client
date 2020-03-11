import styled from 'styled-components/native';
import {WebView as RawWebView} from 'react-native-webview';

export const FullScreen = styled.View`
  flex: 1;
  background: ${({theme}) => theme.color.whiteMild};
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const WebViewWrapper = styled.View`
  flex: 1;
  margin: 0 -${({theme}) => theme.space.rootHorizontal}px;
`;

export const WebView = styled(RawWebView)`
  flex: 1;
`;
