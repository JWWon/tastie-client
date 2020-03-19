import React from 'react';

import StackView from '@components/templates/StackView';
import {SessionNavigationProp} from '@navigations/Session';
import {SCREEN} from '@utils/consts';

interface Props {
  navigation: SessionNavigationProp<typeof SCREEN.CONFIRM_EMAIL>;
}

const ConfirmEmail: React.FC<Props> = ({navigation}) => (
  <StackView
    title="<b>이메일</b> 전송 완료!"
    description={{
      message: '비밀번호 재설정을 위해 이메일을 확인해주세요.',
    }}
    dismiss={{icon: 'arrow', onPress: navigation.goBack}}
    pageButton={{
      message: '오케이 땡큐!',
      onPress: navigation.popToTop,
    }}
  />
);

export default ConfirmEmail;
