import DeviceInfo from 'react-native-device-info';

class Model {
  private model: string;

  constructor() {
    this.model = DeviceInfo.getModel();
  }

  public isIphoneWithNotch = () => {
    switch (this.model) {
      case 'iPhone X':
      case 'iPhone Xs':
      case 'iPhone Xs Max':
      case 'iPhone 11':
      case 'iPhone 11 Pro':
      case 'iPhone 11 Pro Max':
        return true;
      default:
        return false;
    }
  };
}

// singleton pattern
const model = new Model();

const rootVertical = 16;
export default {
  rootHorizontal: 24,
  rootTop: rootVertical,
  rootBottom: model.isIphoneWithNotch() ? 0 : rootVertical,
  wide: 24,
  basic: 16,
  narrow: 12,
};
