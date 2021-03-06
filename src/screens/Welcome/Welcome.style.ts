import styled from 'styled-components/native';

import WideButton from '@components/atoms/WideButton';
import TextHighlight from '@components/atoms/TextHighlight';

export const Container = styled.View`
  flex: 1;
`;

export const LogoWithBI = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BI = styled(TextHighlight)`
  margin-bottom: ${({theme}) => theme.space.narrow}px;
`;

export const Logo = styled.Image.attrs({
  source: require('@assets/images/logo-tastie/logo-tastie.png'),
})``;

export const Provider = styled(WideButton)`
  margin: ${({theme}) => theme.space.basic / 2}px 0;
`;
