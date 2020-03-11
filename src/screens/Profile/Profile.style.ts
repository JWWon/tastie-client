import styled from 'styled-components/native';

import TextHighlight from '@components/atoms/TextHighlight';
import {shadow} from '@styles/mixins';
import {Family} from '@styles/fonts';

export const ProfileWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  padding: ${({theme}) => theme.space.basic}px;
  margin-bottom: ${({theme}) => theme.space.wide}px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  background: ${({theme}) => theme.color.white};
  align-items: center;
  ${shadow};
`;

const thumbnailSize = 76;
export const EmptyThumbnail = styled.View`
  width: ${thumbnailSize}px;
  height: ${thumbnailSize}px;
  border: 1px solid ${({theme}) => theme.color.blackDim};
  border-radius: ${thumbnailSize / 2}px;
  background: ${({theme}) => theme.color.grayLighter};
  margin-bottom: ${({theme}) => theme.space.basic}px;
`;

export const ContentLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: ${({theme}) => theme.space.basic}px 0;
`;

export const Divider = styled.View`
  height: 1px;
  background: ${({theme}) => theme.color.grayLighter};
`;

export const Footer = styled.View`
  margin: ${({theme}) =>
    `${theme.space.wide}px ${-theme.space.rootHorizontal}px 0`};
  padding: ${({theme}) =>
    `${theme.space.basic}px ${theme.space.rootHorizontal}px`};
  background: ${({theme}) => theme.color.grayLighter};
`;

// Text
export const Title = styled(TextHighlight)`
  margin-bottom: ${({theme}) => theme.space.wide}px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.black};
`;

export const Email = styled.Text`
  ${({theme}) => theme.font.size12}
  color: ${({theme}) => theme.color.grayLight};
  margin-top:4px;
`;

export const ContentTitle = styled.Text`
  ${({theme}) => theme.font.size14}
`;

export const Copyright = styled.Text`
  ${({theme}) => theme.font.size12}
  color: ${({theme}) => theme.color.grayLight};
`;
