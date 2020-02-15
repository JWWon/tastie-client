import {css} from 'styled-components/native';

import colors from './colors';
import {Platform} from 'react-native';

// FONT_STYLE
export const content = css`
  font-family: NanumSquareR;
  font-size: 24px;
  color: ${colors.grayDark};
  padding: 0; /* Corresponding Android */
`;

export const keyword = css`
  font-family: NanumSquareEB;
  font-size: 24px;
  color: ${colors.black};
  padding: 0; /* Corresponding Android */
`;
// END FONT_STYLE

// SHADOW
export const shadow = Platform.select({
  ios: css`
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  `,
  android: css`
    elevation: 5;
  `,
});
// END SHADOW
