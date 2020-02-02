import React from 'react';

import {Props} from './TextRow.type';
import * as s from './TextRow.style';

/**
 * If you put <b>, </b> tag inside string,
 * it automatical converts into Keyword component.
 */
const TextRow: React.FC<Props> = ({message}) => {
  const list = message.match(/(.*)<b>(.*)<\/b>(.*)/i);
  if (list === null) {
    return <s.Content>{message}</s.Content>;
  }
  // remove message itself on list
  list.splice(0, 1);
  return (
    <s.Content>
      {list[0]}
      <s.Keyword>{list[1]}</s.Keyword>
      {list[2]}
    </s.Content>
  );
};

export default TextRow;
