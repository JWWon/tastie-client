import styled from 'styled-components/native';

export const HideContainer = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  padding-top: ${({theme}) => theme.space.rootTop}px;
  padding-bottom: ${({theme}) =>
    theme.size.button.cat + theme.space.rootBottom}px;
`;
