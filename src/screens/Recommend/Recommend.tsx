/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import {Easing} from 'react-native';
import {connect} from 'react-redux';
import {Animated} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import Home from '@components/templates/Home';
import PlaceCard from '@components/organisms/PlaceCard';
import Sentence from '@components/molcules/Sentence';
import {RootState} from '@store/reducers';
import {updateContent, hideMessage} from '@store/actions/message';
import {HomeParamList} from '@navigations/Home';

const mapStateToProps = (state: RootState) => ({
  recommend: state.recommend,
  loading: state.message.loading,
  category: state.case.category,
  homeHeight: state.device.homeHeight,
});

const mapDispatchToProps = {
  updateMessage: updateContent,
  hide: hideMessage,
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    navigation: BottomTabNavigationProp<HomeParamList, 'Recommend'>;
  };

interface State {
  status: 'LOADING' | 'SUCCESS' | 'ERROR';
  value: Animated.Value;
}

function getTitle(status: State['status']) {
  switch (status) {
    case 'LOADING':
      return '<b>Anna</b>가 정하는 중이에요...';
    case 'SUCCESS':
      return '<b>Anna</b>가 정한';
    default:
      return '<b>Anna</b>가 정하지 못했어요 :(';
  }
}

class Recommend extends React.PureComponent<Props, State> {
  public state: State = {
    status: 'LOADING',
    value: new Animated.Value(1),
  };

  private handleDismiss = () => {
    const {navigation, updateMessage} = this.props;
    updateMessage({content: '다른 음식이 먹고싶나옹?'});
    navigation.navigate('Case');
  };

  public static getDerivedStateFromProps(props: Props, state: State) {
    if (state.status !== 'LOADING' && props.loading) {
      // loading start
      return {status: 'LOADING'};
    }
    return null;
  }

  public componentDidUpdate(prevProps: Props) {
    const {loading, recommend, updateMessage, hide} = this.props;
    if (prevProps.loading && !loading) {
      if (!recommend.id) {
        // ERROR
        this.setState({status: 'ERROR'});
        return;
      }
      // SUCCESS
      hide();
      Animated.timing(this.state.value, {
        toValue: 0,
        duration: 560,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        updateMessage({content: '맘에 들었다면 츄르를 달라옹!'});
        this.setState({status: 'SUCCESS'});
      });
    } else if (!prevProps.loading && loading) {
      // LOADING
      this.state.value.setValue(1);
      this.setState({status: 'LOADING'});
    }
  }

  public render() {
    const {category, recommend, homeHeight} = this.props;
    const {status, value} = this.state;
    const translateY = value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, homeHeight / 2 - 20],
    });

    return (
      <Home>
        <Animated.View style={{transform: [{translateY}]}}>
          <Sentence message={getTitle(status)} />
        </Animated.View>
        {status === 'SUCCESS' && (
          <>
            <Sentence message={`오늘 <b>${category}</b>은,`} />
            <PlaceCard onDismiss={this.handleDismiss} {...recommend} />
          </>
        )}
      </Home>
    );
  }
}

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
