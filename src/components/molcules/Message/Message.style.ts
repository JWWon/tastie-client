import styled from 'styled-components/native';

import RawFading from '@components/atoms/Fading';

interface MessageProps {
  alert: boolean;
}

export const Fading = styled(RawFading)`
  margin-bottom: 6px;
  align-items: center;
`;

const selectBgColor = ({theme, alert}: any) =>
  alert ? theme.color.blue : '#ffffff';

const borderWidth = 1;
export const Bubble = styled.View<MessageProps>`
  background: ${selectBgColor};
  border: ${borderWidth}px solid ${({theme}) => theme.color.blackBorder};
  border-radius: ${({theme}) => theme.size.roundBorder}px;
  width: 100%;
  padding: 12px 16px;
`;

// TRIANGLE
const width = 12;
const height = 16;
export const TriangleBorder = styled.View`
  width: 0;
  height: 0;
  margin-top: -${borderWidth}px;

  border: ${width}px solid transparent;
  border-bottom-width: 0;
  border-top-width: ${height}px;
  border-top-color: ${({theme}) => theme.color.blackBorder};
`;

export const TriangleBackground = styled(TriangleBorder)<MessageProps>`
  margin-top: -${height + borderWidth}px;
  margin-left: -${width - borderWidth}px;

  border-width: ${width - borderWidth}px;
  border-top-width: ${height - borderWidth}px;
  border-top-color: ${selectBgColor};
`;
// END TRIANGLE

export const Content = styled.Text<MessageProps>`
  font-family: ${({alert}) => (alert ? 'NanumSquareB' : 'NanumSquareR')};
  font-size: 14px;
  color: ${({theme, alert}) => (alert ? '#ffffff' : theme.color.blackMild)};
`;
