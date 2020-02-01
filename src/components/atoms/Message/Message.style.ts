import styled from 'styled-components/native';

interface MessageProps {
  pressActive: boolean;
}

const selectBgColor = ({theme, pressActive}: any) =>
  pressActive ? theme.color.blue : '#ffffff';

const borderWidth = 1;
export const Wrapper = styled.View<MessageProps>`
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
  font-family: ${({pressActive}) =>
    pressActive ? 'NanumSquareB' : 'NanumSquareR'};
  font-size: 14px;
  color: ${({theme, pressActive}) =>
    pressActive ? '#ffffff' : theme.color.blackMild};
`;
