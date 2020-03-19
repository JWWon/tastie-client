import React from 'react';

import {Props} from './TextHighlight.type';
import * as s from './TextHighlight.style';

/**
 * If you put <b>, </b> tag inside string,
 * it automatically converts into Keyword component.
 */
const TextHighlight: React.FC<Props> = ({message, style}) => {
  const list = message.match(/(.*)<b>(.*)<\/b>(.*)/i);
  if (list === null) {
    return <s.Content style={style}>{message}</s.Content>;
  }
  // remove message itself on list
  list.splice(0, 1);

  return (
    <s.Content style={style}>
      {list[0]}
      <s.Keyword>{list[1]}</s.Keyword>
      {list[2]}
    </s.Content>
  );
};

export default TextHighlight;
