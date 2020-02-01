import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  width: ${({theme}) => theme.size.navButton}px;
  height: ${({theme}) => theme.size.navButton}px;
  border: 1px solid rgba(188, 188, 188, 0.1);
  border-radius: ${({theme}) => theme.size.navButton / 2}px;
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
