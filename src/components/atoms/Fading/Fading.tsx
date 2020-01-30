import React from 'react';
import {Animated} from 'react-native';

interface Props {
  [style: string]: any;
}

interface State {
  value: Animated.Value;
}

class Fading extends React.PureComponent<Props, State> {
  private opacity: Animated.AnimatedInterpolation;

  public state: State = {
    value: new Animated.Value(0),
  };

  public constructor(props: Props) {
    super(props);
    this.opacity = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  }

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

  public render() {
    const {children, ...style} = this.props;

    return (
      <Animated.View style={{...style, opacity: this.opacity}}>
        {children}
      </Animated.View>
    );
  }
}

export default Fading;
