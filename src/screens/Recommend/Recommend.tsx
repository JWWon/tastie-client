import React from 'react';
import {Easing} from 'react-native';
import {connect} from 'react-redux';
import {Animated} from 'react-native';

import Home from '@components/templates/Home';
import PlaceCard from '@components/organisms/PlaceCard';
import Sentence from '@components/molcules/Sentence';
import {RootState} from '@store/reducers';
import {updateContent, hideMessage} from '@store/actions/message';

const mapStateToProps = (state: RootState) => ({
  recommend: state.recommend,
  loading: state.message.loading,
  category: state.case.category,
  homeHeight: state.device.homeHeight,
});

const mapDispatchToProps = {
  updateMessage: updateContent,
  hideMessage,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

interface State {
  loading: boolean;
  value: Animated.Value;
}

const alert = '<b>Anna</b>가 정하는 중이에요...';
const title = '<b>Anna</b>가 정한';

class Recommend extends React.PureComponent<Props, State> {
  public state = {
    loading: true,
    value: new Animated.Value(1),
  };

  public static getDerivedStateFromProps(props: Props, state: State) {
    if (!state.loading && props.loading) {
      // loading start
      return {loading: true};
    }
    return null;
  }

  public componentDidUpdate(prevProps: Props) {
    const {loading, updateMessage} = this.props;
    if (prevProps.loading && !loading) {
      // loading complete
      this.props.hideMessage();
      Animated.timing(this.state.value, {
        toValue: 0,
        duration: 560,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        updateMessage({content: '맘에 들었다면 츄르를 달라옹!'});
        this.setState({loading: false});
      });
    } else if (!prevProps.loading && loading) {
      // loading start
      this.state.value.setValue(1);
    }
  }

  public render() {
    const {category, recommend, homeHeight} = this.props;
    const {loading, value} = this.state;
    const translateY = value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, homeHeight / 2 - 20],
    });

    return (
      <Home>
        <Animated.View style={{transform: [{translateY}]}}>
          <Sentence message={loading ? alert : title} />
        </Animated.View>
        {!loading && (
          <>
            <Sentence message={`오늘 <b>${category}</b>은,`} />
            <PlaceCard {...recommend} />
          </>
        )}
      </Home>
    );
  }
}

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
