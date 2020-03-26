import styled from 'styled-components/native';
import RawMapView, {Marker as RawMarker} from 'react-native-maps';

import {Family} from '@styles/fonts';

export const MapView = styled(RawMapView)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Marker = styled(RawMarker)`
  align-items: center;
`;

export const Mascot = styled.Image.attrs({
  source: require('@assets/images/icon-cat/icon-cat.png'),
}).attrs({
  resizeMode: 'contain',
})`
  height: 24px;
`;

export const Stick = styled.View`
  width: 2px;
  height: 8px;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  background: ${({theme}) => theme.color.black};
`;

export const Shadow = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 1.5px;
  margin-top: -1px;
  background: ${({theme}) => theme.color.blackBorder};
  transform: scaleX(4);
`;

// Text
export const Name = styled.Text`
margin-top: 2px;
  ${({theme}) => theme.font.size12}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.black};
  text-shadow-color: ${({theme}) => theme.color.whiteMild};
  text-shadow-radius: 2px;
  /* text-shadow: 2px 2px 2px ${({theme}) => theme.color.white}; */
`;
