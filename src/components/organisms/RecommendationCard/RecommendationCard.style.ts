import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import RawLabel from '@components/atoms/Label';
import RawIconButton from '@components/atoms/IconButton';

// View
export const TouchableWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  flex: 1;
  margin: 0 ${({theme}) => theme.space.pager}px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  overflow: hidden;
`;

export const BackgroundImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

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

export const Label = styled(RawLabel).attrs(({theme}) => ({
  color: theme.color.white,
}))``;

// Button
export const IconButton = styled(RawIconButton)`
  padding-left: ${({theme}) => theme.space.basic}px;
`;
