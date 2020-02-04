import React, {useState, useEffect} from 'react';
import {FlatList, Animated, Easing} from 'react-native';

import * as s from './Loading.style';

interface LoadingState {
  value: Animated.Value;
}

const Loading: React.FC = () => {
  const [items] = useState([
    {value: new Animated.Value(0)},
    {value: new Animated.Value(0)},
    {value: new Animated.Value(0)},
  ]);

  function renderDot({item}: {item: LoadingState}) {
    const backgroundColor = item.value.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(188,188,188)', 'rgb(84,84,84)'],
    });
    return <s.Dot as={Animated.View} style={{backgroundColor}} />;
  }

  useEffect(() => {
    const time = 520;
    Animated.stagger(
      time,
      items.map(item =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(item.value, {
              toValue: 1,
              duration: time / 2,
              easing: Easing.inOut(Easing.linear),
            }),
            Animated.timing(item.value, {
              toValue: 0,
              duration: time / 2,
              easing: Easing.inOut(Easing.linear),
            }),
            Animated.delay(time * 2),
          ]),
        ),
      ),
    ).start();
  });

  return (
    <FlatList<LoadingState>
      data={items}
      renderItem={renderDot}
      keyExtractor={(_, idx) => idx.toString()}
      horizontal={true}
    />
  );
};

export default Loading;
