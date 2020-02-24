import {Dimensions} from 'react-native';
import space from './spaces';

const {height} = Dimensions.get('screen');

const sizes = {
  button: {
    cat: 52,
  },
  border: {
    basic: 12,
  },
  // View Position
  placeCardHover: 24,
};

export default {
  ...sizes,
  view: {
    rootHeight: height - (space.rootTop + space.rootBottom + sizes.button.cat), // without message height
  },
};
