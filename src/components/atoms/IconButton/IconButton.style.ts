import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

interface IconProps {
  height?: number;
}

export const Icon = styled.Image.attrs({
  aspectRatio: 1.05,
})<IconProps>`
  height: ${({height}) => height || 18}px;
`;
