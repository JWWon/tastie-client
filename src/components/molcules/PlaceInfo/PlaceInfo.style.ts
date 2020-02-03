import styled from 'styled-components/native';

import * as mixin from '@styles/mixins';

// View
export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding-bottom: ${({theme}) => theme.size.verticalPadding}px;
`;

export const DynamicInfo = styled.View`
  flex-direction: row;
  margin-top: 4px;
  justify-content: space-between;
  align-items: center;
`;

// Text
export const Title = styled.Text`
  ${mixin.keyword}
`;

export const Category = styled.Text`
  font-family: NanumSquareB;
  font-size: 14px;
  color: ${({theme}) => theme.color.grayLight};
`;

export const Distance = styled.Text`
  font-family: NotoSansKR-Regular;
  font-size: 12px;
  color: ${({theme}) => theme.color.grayLight};
`;
