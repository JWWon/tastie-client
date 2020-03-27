import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${({theme}) =>
    `${theme.space.wide - theme.space.basic / 2}px 0 ${36 -
      theme.space.basic / 2}px`};
`;

export const InfoColumnWrapper = styled.View`
  flex-direction: row;
  margin: ${({theme}) => theme.space.basic / 2}px 0;
`;

export const ExtraSpace = styled.View``;
