import styled from 'styled-components/native';

import {Props} from './WideButton.type';
import {Family} from '@styles/fonts';
import {shadow} from '@styles/mixins';

type StyleProps = Pick<Props, 'buttonColor'>;
interface ButtonProps extends StyleProps {
  height: number;
}

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<ButtonProps>`
  width: 100%;
  height: ${({height}) => height}px;
  border-radius: ${({height}) => height / 2}px;
  background: ${({theme, buttonColor}) => theme.color[buttonColor || 'white']};
  justify-content: center;
  align-items: center;
  ${shadow}
`;

const iconSpace = 14;
export const Icon = styled.Image.attrs({resizeMode: 'contain'})<ButtonProps>`
  position: absolute;
  top: ${iconSpace}px;
  left: 24px;
  width: ${({height}) => height - iconSpace * 2}px;
  height: ${({height}) => height - iconSpace * 2}px;
`;

export const Message = styled.Text<StyleProps>`
  ${({theme}) => theme.font.size14}
  font-family: ${Family.NanumSquare.EB};
  color: ${({theme, buttonColor}) =>
    theme.color[buttonColor ? 'white' : 'black']};
`;
