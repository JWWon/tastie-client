import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import IconButton from '@components/atoms/IconButton';

export const Link = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  height: 180px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  background: ${({theme}) => theme.color.grayLight};
  overflow: hidden;
  margin-bottom: ${({theme}) => theme.space.basic}px;
`;

export const LoadingWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const ImageFilter = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.5)'],
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({theme}) => theme.space.basic}px;
`;

// Icon
export const LikeIcon = styled(IconButton).attrs({
  disabled: true,
})`
  position: absolute;
  bottom: ${({theme}) => theme.space.basic}px;
  right: ${({theme}) => theme.space.basic}px;
`;

// Text
export const Address = styled.Text`
  ${({theme}) => theme.font.size12};
  color: ${({theme}) => theme.color.grayLighter};
  margin-bottom: 2px;
  text-align: center;
`;

export const PlaceName = styled.Text`
  ${({theme}) => theme.font.size24}
  color: ${({theme}) => theme.color.white};
`;
