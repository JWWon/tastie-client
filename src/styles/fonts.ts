import color from './colors';

export const Family = {
  NanumSquare: {
    B: 'NanumSquareB',
    EB: 'NanumSquareEB',
    L: 'NanumSquareL',
    R: 'NanumSquareR',
  },
};

const fonts = {
  size24: `font-family: ${Family.NanumSquare.EB};
font-size: 24px;
padding: 0;
`,
  size14: `font-family: ${Family.NanumSquare.B};
font-size: 14px;
padding: 0;
`,
  size12: `font-family: ${Family.NanumSquare.R};
font-size: 12px;
padding: 0;
`,
  size10: `font-family: ${Family.NanumSquare.R};
font-size: 10px;
padding: 0;
`,
};

export default {
  ...fonts,
  // custom font styles
  content: `${fonts.size24}
font-family: ${Family.NanumSquare.R};
color: ${color.grayDark};`,
};
