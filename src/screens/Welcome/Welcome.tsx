import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {loginWithFacebook, loginWithGoogle} from '@store/actions/auth';
import {SessionNavigationProp} from '@navigations/Session';
import BaseView from '@components/templates/BaseView';
import {setNavigation} from '@utils/SessionService';
import {SCREEN} from '@utils/consts';
import * as s from './Welcome.style';

interface Props {
  navigation: SessionNavigationProp<typeof SCREEN.WELCOME>;
}

const Welcome: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setNavigation(navigation);
  }, []);

  return (
    <BaseView>
      <s.Container>
        <s.LogoWithBI>
          <s.BI message="내가 뭘 <b>먹고싶은지</b>" />
          <s.BI message="나도 모르니까," />
          <s.Logo />
        </s.LogoWithBI>
        <s.Provider
          message="이메일로 시작하기"
          onPress={() => navigation.navigate(SCREEN.SIGNUP)}
          buttonColor="blue"
        />
        <s.Provider
          message="구글로 시작하기"
          onPress={() => dispatch(loginWithGoogle.request())}
          icon={require('@assets/images/logo-google/logo-google.png')}
        />
        <s.Provider
          message="페이스북으로 시작하기"
          onPress={() => dispatch(loginWithFacebook.request())}
          icon={require('@assets/images/logo-facebook/logo-facebook.png')}
        />
      </s.Container>
    </BaseView>
  );
};

export default Welcome;
