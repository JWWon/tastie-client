import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  source: require('@assets/images/logo-tastie/logo-tastie.png'),
  resizeMode: 'contain',
})`
  height: 87px;
`;
