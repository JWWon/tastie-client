import styled from 'styled-components/native';

interface ButtonProps {
  size?: number;
}

const buttonSize = 24;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<ButtonProps>`
  width: ${({size}) => size || buttonSize}px;
  height: ${({size}) => size || buttonSize}px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;

const ratio = 75;
export const Icon = styled.Image.attrs({})`
  width: ${ratio}%;
  height: ${ratio}%;
  resize-mode: contain;
`;
