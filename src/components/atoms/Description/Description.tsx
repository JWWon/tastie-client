import React from 'react';

import {Props} from './Description.type';
import * as s from './Description.style';

/**
 * If you put <a>, </a> tag inside string,
 * it automatically converts into Touchable component.
 */
const Description: React.FC<Props> = ({message, onPress, style}) => {
  const list = message.match(/(.*)<a>(.*)<\/a>(.*)/i);
  if (list === null) {
    return <s.Message style={style}>{message}</s.Message>;
  }
  // remove message itself on list
  list.splice(0, 1);

  return (
    <s.Wrapper>
      <s.Message style={style}>{list[0]}</s.Message>
      <s.Link onPress={onPress}>
        <s.LinkMessage style={style}>{list[1]}</s.LinkMessage>
      </s.Link>
      <s.Message style={style}>{list[2]}</s.Message>
    </s.Wrapper>
  );
};

export default Description;
