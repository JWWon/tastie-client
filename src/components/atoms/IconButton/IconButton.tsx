import React from 'react';
import {Image} from 'react-native';

import * as s from './IconButton.style';
import {Props} from './IconButton.type';

const IconButton: React.FC<Props> = ({
  onPress,
  extraSpace,
  message,
  messageStyle,
  ...image
}) => {
  const {width, height} = Image.resolveAssetSource(image.source);
  const aspectRatio = width / height;

  const Icon = () => (
    <>
      <s.Icon
        {...image}
        style={[image.style, {aspectRatio}]}
        resizeMode="contain"
      />
      {message && <s.Message style={messageStyle}>{message}</s.Message>}
    </>
  );

  return onPress ? (
    <s.Button extraSpace={extraSpace} onPress={onPress}>
      <Icon />
    </s.Button>
  ) : (
    <s.Wrapper>
      <Icon />
    </s.Wrapper>
  );
};

export default IconButton;
