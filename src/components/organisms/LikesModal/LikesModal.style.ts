import styled from 'styled-components/native';

import {shadow} from '@styles/mixins';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.View`
  padding: ${({theme}) => theme.space.wide}px;
`;

const buttonSize = 52;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  border: 1px solid ${({theme}) => theme.color.blackDim};
  border-radius: ${buttonSize / 2}px;
  background: ${({theme}) => theme.color.white};
  justify-content: center;
  align-items: center;
  ${shadow};
`;

export const Icon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 48%;
  height: 48%;
`;

export const Message = styled.Text`
  ${({theme}) => theme.font.size12}
  align-self: center;
  margin-top: ${({theme}) => theme.space.narrow}px;
  color: ${({theme}) => theme.color.white};
`;
