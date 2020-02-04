import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

const moreIconSize = 16;
export const MoreIcon = styled.Image.attrs({
  source: require('@assets/images/icon-add/icon-add.png'),
})`
  width: ${moreIconSize}px;
  height: ${moreIconSize}px;
`;

export const MoreMessage = styled.Text`
  margin-left: 8px;
  font-family: NanumSquareB;
  font-size: 16px;
  color: ${props => props.theme.color.blue};
`;
