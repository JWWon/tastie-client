import styled from 'styled-components/native';

import RawLabel from '@components/atoms/Label';
import {shadow} from '@styles/mixins';

// View
export const Container = styled.View`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: ${({theme}) => theme.color.whiteMild};
  padding-bottom: ${({theme}) => theme.space.wide}px;
`;

export const ContentWrapper = styled.View`
  padding: ${({theme}) =>
    `${theme.space.wide}px ${theme.space.rootHorizontal}px`};
`;

export const HeaderWrapper = styled.View`
  padding-bottom: ${({theme}) => theme.space.basic}px;
  border-color: ${({theme}) => theme.color.grayLighter};
  border-bottom-width: 1px;
`;

export const LabelWrapper = styled.View`
  margin-top: 8px;
  flex-direction: row;
`;

export const Buttons = styled.View`
  margin-top: ${({theme}) => theme.space.narrow}px;
  flex-direction: row;
`;

export const ButtonBorder = styled.View`
  flex: 1;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const LoadingWrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DismissSafe = styled.SafeAreaView`
  position: absolute;
  top: ${({theme}) => theme.space.rootTop}px;
  left: ${({theme}) => theme.space.rootHorizontal}px;
`;

export const ExtraInfoWrapper = styled.View`
  width: 100%;
`;

export const MapWrapper = styled.View`
  border-radius: ${({theme}) => theme.size.border.basic}px;
  overflow: hidden;
  width: 100%;
  height: 120px;
`;

export const LocationMenuWrapper = styled.View`
  ${shadow}
  margin-top: ${({theme}) => theme.space.basic}px;
  width: 100%;
  height: 46px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  background: ${({theme}) => theme.color.white};
`;

// Text
export const PlaceName = styled.Text`
  ${({theme}) => theme.font.size24}
`;

export const Label = styled(RawLabel).attrs(({theme}) => ({
  color: theme.color.grayDark,
}))``;

// Line
export const Divider = styled.View`
  width: 1px;
  height: 20px;
  background: ${({theme}) => theme.color.grayLighter};
  align-self: center;
`;
