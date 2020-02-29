import styled, {css} from 'styled-components/native';

export const FullScreen = styled.View`
  flex: 1;
  padding: 0 ${({theme}) => theme.space.rootHorizontal}px;
  background: ${({theme}) => theme.color.whiteMild};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

const verticalSpace = css`
  flex: 1;
  padding-top: ${({theme}) => theme.space.rootTop}px;
  padding-bottom: ${({theme}) => theme.space.rootBottom}px;
`;

export const ViewWrapper = styled.View`
  ${verticalSpace}
`;
