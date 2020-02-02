import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  position: absolute;
  left: 0;
  bottom: ${({theme}) => theme.size.verticalPadding}px;
  width: 100%;
  align-items: center;
`;
