import {isIphoneX, getBottomSpace} from '@utils/device';

const rootVertical = 16;

export default {
  // root
  rootHorizontal: 24,
  rootTop: rootVertical,
  rootBottom: isIphoneX() ? 0 : rootVertical,
  notchBottom: getBottomSpace(),
  // general
  wide: 24,
  basic: 16,
  narrow: 12,
  // component spceific
  pager: 8,
};
