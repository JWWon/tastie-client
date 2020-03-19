import {Family} from '@styles/fonts';
import styled from 'styled-components/native';
import RawMapView, {Marker as RawMarker} from 'react-native-maps';

export const Container = styled.View`
  border-radius: ${({theme}) => theme.size.border.basic}px;
  overflow: hidden;
  width: 100%;
  height: 160px;
`;

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

export const AddressWrapper = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 8px;
  border-radius: 8px;
  background: rgba(12, 12, 12, 0.4);
`;

// Text
export const Address = styled.Text`
  ${({theme}) => theme.font.size10}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.white};
`;
