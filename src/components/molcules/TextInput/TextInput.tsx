import React from 'react';
import {Animated} from 'react-native';

import * as style from './TextInput.style';
import {Props, State} from './TextInput.type';
import TextRow from '@components/atoms/TextRow';
import Helper from '@components/atoms/HelperRow';

class TextInput extends React.PureComponent<Props, State> {
  state: State = {
    value: new Animated.Value(0),
  };

  public componentDidMount() {
    this.fadeIn();
  }

  public componentWillUnmount() {
    this.fadeOut();
  }

  private fadeIn = () => {
    Animated.timing(this.state.value, {toValue: 1, duration: 360}).start();
  };

  private fadeOut = () => {
    Animated.timing(this.state.value, {toValue: 0, duration: 360}).start();
  };

  private interpolate = (output: number) =>
    this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, output],
    });

  public render() {
    const {autocomplete, placeholder, onSelect, value, ...props} = this.props;
    const opacity = this.interpolate(1);

    return (
      <style.Container as={Animated.View} style={{opacity}}>
        <TextRow {...{value, ...props}} />
        <Helper {...{autocomplete, placeholder, onSelect, value}} />
      </style.Container>
    );
  }
}

export default TextInput;
