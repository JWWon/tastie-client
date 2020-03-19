import {css} from 'styled-components/native';
import {Platform} from 'react-native';

// SHADOW
export const shadow = Platform.select({
  ios: css`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
  `,
  android: css`
    elevation: 4;
  `,
});
// END SHADOW
