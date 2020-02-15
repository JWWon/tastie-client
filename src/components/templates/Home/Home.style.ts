import styled from 'styled-components/native';

export const FullScreen = styled.View`
  flex: 1;
  padding: 0 ${props => props.theme.size.templatePadding}px;
  background: #fdfdfd;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: transparent;
`;

export const HideContainer = styled.TouchableWithoutFeedback`
  flex: 1;
  background: transparent;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  background: transparent;
  padding-top: ${({theme}) => theme.size.templatePadding}px;
  padding-bottom: ${({theme}) =>
    theme.size.navButton +
    theme.size.verticalPadding +
    theme.size.templatePadding}px;
`;
