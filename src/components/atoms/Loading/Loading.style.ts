import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const width = 7;
export const Dot = styled.View`
  width: ${width}px;
  height: 10px;
  margin: 0 ${width / 2}px;

  border-radius: ${width / 2}px;
`;
