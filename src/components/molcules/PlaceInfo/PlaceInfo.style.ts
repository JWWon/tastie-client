import styled from 'styled-components/native';

import * as mixin from '@styles/mixins';

// View
const space = 16;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding-bottom: ${({theme}) => theme.size.verticalPadding}px;
`;

export const DynamicInfo = styled.View`
  flex-direction: row;
  margin-top: 4px;
  align-items: center;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-top: ${space}px;
`;

export const StaticInfo = styled.View`
  margin-top: ${space / 2}px;
`;

export const StaticInfoRow = styled.View`
  margin-top: ${space / 2}px;
  flex-direction: row;
  justify-content: space-between;
`;

// Text
const NotoSansGray = styled.Text`
  font-family: NotoSansKR-Regular;
  color: ${({theme}) => theme.color.grayLight};
`;

export const Name = styled.Text`
  ${mixin.keyword}
  font-family: NotoSansKR-Bold;
`;

export const Types = styled(NotoSansGray).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  flex: 1;
  font-size: 14px;
`;

export const Distance = styled(NotoSansGray)`
  font-size: 12px;
`;

export const InfoType = styled.Text`
  font-family: NotoSansKR-Bold;
  font-size: 12px;
  color: ${({theme}) => theme.color.black};
`;

export const InfoContent = styled(NotoSansGray)`
  font-size: 12px;
`;
