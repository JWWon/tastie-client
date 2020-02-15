import styled from 'styled-components/native';

import * as mixin from '@styles/mixins';

// View
const space = 18;

export const Container = styled.View``;

export const DynamicInfo = styled.View`
  flex-direction: row;
  margin-top: 4px;
  align-items: center;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  padding: ${space}px 0;
`;

export const StaticInfo = styled.View`
  margin-top: -${space / 3}px;
`;

export const StaticInfoRow = styled.View`
  padding: ${space / 3}px 0;
  flex-direction: row;
  justify-content: space-between;
`;

// Text
const GrayFont = styled.Text`
  font-family: NanumSquareR;
  color: ${({theme}) => theme.color.grayLight};
`;

export const Name = styled.Text`
  ${mixin.keyword}
`;

export const Types = styled(GrayFont).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  flex: 1;
  font-size: 14px;
`;

export const Distance = styled(GrayFont)`
  font-size: 12px;
`;

export const InfoType = styled.Text`
  font-family: NanumSquareEB;
  font-size: 12px;
  color: ${({theme}) => theme.color.black};
`;

export const InfoContent = styled(GrayFont)`
  font-size: 12px;
`;
