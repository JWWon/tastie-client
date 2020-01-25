import styled from 'styled-components/native';

const buttonSize = 52;
export const Button = styled.TouchableOpacity`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  border: 1px solid rgba(188, 188, 188, 0.1);
  border-radius: ${buttonSize / 2}px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* shadow */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

const catSize = 56.2; // relative size
export const IconCat = styled.Image.attrs(() => ({
  source: require('@assets/images/icon-cat/icon-cat.png'),
}))`
  width: ${catSize}%;
  height: ${catSize}%;
`;
