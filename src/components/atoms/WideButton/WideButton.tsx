import React from 'react';

import {Props} from './WideButton.type';
import * as s from './WideButton.style';

const WideButton: React.FC<Props> = ({
  message,
  onPress,
  style,
  icon,
  height,
  buttonColor,
}) => {
  const buttonHeight = height || 52;

  return (
    <s.Button
      style={style}
      onPress={onPress}
      buttonColor={buttonColor}
      height={buttonHeight}>
      {icon && <s.Icon source={icon} height={buttonHeight} />}
      <s.Message buttonColor={buttonColor}>{message}</s.Message>
    </s.Button>
  );
};

export default WideButton;
