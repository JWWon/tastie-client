import React from 'react';

import * as s from './Label.style';

export interface Props {
  color?: string;
}

const Label: React.FC<Props> = ({children, color}) => (
  <s.Label color={color}>{children}</s.Label>
);

export default Label;
