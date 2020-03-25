import React from 'react';
import {Image} from 'react-native';

import * as s from './IconButton.style';
import {Props} from './IconButton.type';

const IconButton: React.FC<Props> = ({
  onPress,
  extraSpace,
  message,
  messageColor,
  ...image
}) => {
  const {width, height} = Image.resolveAssetSource(image.source);
  const aspectRatio = width / height;

  return (
    <s.Button extraSpace={extraSpace} onPress={onPress}>
      <s.Icon
        {...image}
        style={[image.style, {aspectRatio}]}
        resizeMode="contain"
      />
      {message && <s.Message messageColor={messageColor}>{message}</s.Message>}
    </s.Button>
  );
};

export default IconButton;
