import styled from 'styled-components/native';

import {Props as DismissProps} from '@components/atoms/DismissButton';

type NavWrapperProps = Pick<DismissProps, 'icon'>;

export const NavWrapper = styled.View<NavWrapperProps>`
  position: absolute;
  z-index: 9;
  top: ${({theme}) => theme.space.basic}px;
  left: 0;
  width: 100%;
  align-items: ${({icon}) => (icon === 'arrow' ? 'flex-start' : 'center')};
  padding-bottom: ${({theme}) => theme.space.wide}px;
`;

interface ScreenInterface {
  hasDismiss?: boolean;
}

export const ScreenWrapper = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'never',
})<ScreenInterface>`
  flex: 1;
  ${({theme, hasDismiss}) =>
    hasDismiss &&
    `padding-top: ${theme.size.button.dismiss + theme.space.wide}px;`}
`;

export const HeaderWrapper = styled.View`
  padding-bottom: ${({theme}) => theme.space.wide}px;
`;

export const ChildrenWrapper = styled.View`
  flex: 1;
  padding-top: ${({theme}) => theme.space.wide}px;
`;
