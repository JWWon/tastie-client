import 'styled-components';

import theme from '@styles/theme';

// extend the module declarations using custom theme type

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
