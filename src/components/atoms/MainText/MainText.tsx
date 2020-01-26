import React from 'react';

import * as style from './MainText.style';

interface Props {
  leadMessage?: string;
  message: string;
}

const MainText: React.FC<Props> = props => (
  <style.Wrapper>
    {props.leadMessage && <style.Content>{props.leadMessage}</style.Content>}
    <style.Content>{props.message}</style.Content>
  </style.Wrapper>
);

export default MainText;
