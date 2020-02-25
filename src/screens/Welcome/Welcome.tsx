import React from 'react';
import {useDispatch} from 'react-redux';

import {loginWithFacebook, loginWithGoogle} from '@store/actions/auth';
import BaseView from '@components/templates/BaseView';
import * as s from './Welcome.style';

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  function handleLoginWithGoogle() {
    dispatch(loginWithGoogle.request());
  }

  function handleLoginWithFB() {
    dispatch(loginWithFacebook.request());
  }

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
          onPress={() => {}}
          buttonColor="blue"
        />
        <s.Provider
          message="구글로 시작하기"
          onPress={handleLoginWithGoogle}
          icon={require('@assets/images/logo-google/logo-google.png')}
        />
        <s.Provider
          message="페이스북으로 시작하기"
          onPress={handleLoginWithFB}
          icon={require('@assets/images/logo-facebook/logo-facebook.png')}
        />
      </s.Container>
    </BaseView>
  );
};

export default Welcome;
