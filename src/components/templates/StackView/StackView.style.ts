import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

interface ScreenInterface {
  hasDismiss?: boolean;
}

export const ScreenWrapper = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'always',
})<ScreenInterface>`
  flex: 1;
  padding-top: ${({theme, hasDismiss}) =>
    theme.space.rootTop +
    (hasDismiss ? theme.size.button.dismiss + theme.space.wide : 0)}px;
  padding-bottom: ${({theme}) => theme.space.basic}px;
`;

export const HeaderWrapper = styled.View`
  padding-bottom: ${({theme}) => theme.space.wide}px;
`;

export const PageButtonWrapper = styled.View`
  padding-top: ${({theme}) => theme.space.basic}px;
  padding-bottom: ${({theme}) => theme.space.rootBottom}px;
`;
