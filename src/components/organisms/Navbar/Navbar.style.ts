import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  position: absolute;
  left: 0;
  bottom: ${({theme}) => theme.space.rootBottom}px;
  width: 100%;
  align-items: center;
`;
