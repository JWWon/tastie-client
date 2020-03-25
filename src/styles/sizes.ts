import {Dimensions} from 'react-native';
import space from './spaces';

const {height} = Dimensions.get('screen');

const sizes = {
  button: {
    tabbar: 56,
    dismiss: 40,
  },
  border: {
    basic: 12,
  },
};

export default {
  ...sizes,
  view: {
    rootHeight:
      height - (space.rootTop + space.rootBottom + sizes.button.tabbar), // without message height
  },
};
