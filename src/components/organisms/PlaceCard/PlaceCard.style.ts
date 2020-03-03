import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import RawIconButton from '@components/atoms/IconButton';
import {Family} from '@styles/fonts';

// View
export const ImageWrapper = styled.ImageBackground`
  flex: 1;
  margin: 0 ${({theme}) => theme.space.pager}px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  overflow: hidden;
`;

export const ImageFilter = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.5)'],
})`
  flex: 1;
  padding: ${({theme}) => theme.space.basic}px;
`;

export const BottomContent = styled.View`
  margin-top: auto;
`;

export const RowContent = styled.View`
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;

// Text
export const Address = styled.Text`
  ${({theme}) => theme.font.size12}
  color: ${({theme}) => theme.color.grayLight};
`;

export const Distance = styled.Text`
  ${({theme}) => theme.font.size14}
  margin-top: 4px;
  color: ${({theme}) => theme.color.white};
`;

export const PlaceName = styled.Text`
  ${({theme}) => theme.font.size24}
  color: ${({theme}) => theme.color.white};
  flex: 1;
`;

export const Label = styled.Text`
  ${({theme}) => theme.font.size12}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.white};
  padding: 4px ${({theme}) => theme.size.border.basic / 2}px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  border: 1px solid ${({theme}) => theme.color.white};
  margin-right: 8px;
`;

// Button
export const IconButton = styled(RawIconButton)`
  padding-left: ${({theme}) => theme.space.basic}px;
`;
