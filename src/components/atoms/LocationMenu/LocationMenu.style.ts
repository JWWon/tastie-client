import styled from 'styled-components/native';

import RawIconButton from '@components/atoms/IconButton';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(RawIconButton).attrs({
  messageStyle: {fontSize: 14},
})``;

export const Divider = styled.View`
  width: 1px;
  height: 18px;
  background: ${({theme}) => theme.color.grayLighter};
  align-self: center;
`;

// Text
export const Message = styled.Text`
  ${({theme}) => theme.font.size14}
`;
