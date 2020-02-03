import React from 'react';
import {Animated, ViewStyle} from 'react-native';

interface Props {
  style?: ViewStyle;
  [options: string]: any;
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
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 360,
      useNativeDriver: true,
    }).start();
  };

  private fadeOut = () => {
    Animated.timing(this.state.value, {
      toValue: 0,
      duration: 360,
      useNativeDriver: true,
    }).start();
  };

  public render() {
    const {children, style, ...options} = this.props;

    return (
      <Animated.View {...options} style={[style, {opacity: this.state.value}]}>
        {children}
      </Animated.View>
    );
  }
}

export default Fading;
