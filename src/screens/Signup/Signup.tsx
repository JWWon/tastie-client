import React, {useState, useRef, useEffect} from 'react';
import * as yup from 'yup';
import {useFormik, FormikProps} from 'formik';
import {AxiosError} from 'axios';
import {
  TextInput as InputType,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import {ResponseError} from '@services/axios.base';
import * as api from '@services/auth';
import TextInput from '@components/molcules/TextInput';
import StackView from '@components/templates/StackView';
import {SessionNavigationProp} from '@navigations/Session';
import {setSignupScreen, removeSignupScreen} from '@utils/SessionService';
import {passwordValidator} from '@utils/validator';
import {isAxiosError} from '@utils/helper';
import {SCREEN} from '@utils/consts';
import * as s from './Signup.style';

interface Props {
  navigation: SessionNavigationProp<typeof SCREEN.SIGNUP>;
}

const Signup: React.FC<Props> = ({navigation}) => {
  const [hadSubmit, setHadSubmit] = useState<boolean>(false);
  const emailRef = useRef<InputType>(null);
  const passwordRef = useRef<InputType>(null);
  const confirmPwdRef = useRef<InputType>(null);

  const formik: FormikProps<{
    email: string;
    password: string;
    confirmPwd: string;
  }> = useFormik({
    initialValues: {email: '', password: '', confirmPwd: ''},
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('올바른 이메일을 입력해주세요.')
        .required('이메일을 꼭 입력해주세요.'),
      password: yup
        .string()
        .matches(
          passwordValidator,
          '영문, 숫자, 특수문자 조합 8자 이상 입력해주세요.',
        )
        .required('비밀번호를 꼭 입력해주세요.'),
      confirmPwd: yup
        .string()
        .oneOf(
          [yup.ref('password'), null],
          '입력하신 비밀번호와 동일하게 입력해주세요.',
        )
        .required('비밀번호를 다시 한 번 입력해주세요.'),
    }),
    validateOnMount: true,
    onSubmit: ({confirmPwd, ...values}) => {
      if (!hadSubmit) setHadSubmit(true);
      navigation.navigate('SignupMeta', {
        type: 'email',
        ...values,
      });
    },
  });

  const inputProps = {
    hadSubmit,
    onChangeText: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  async function handleEmailBlur(
    e: string | NativeSyntheticEvent<TextInputFocusEventData>,
  ) {
    formik.handleBlur(e);
    try {
      await api.checkAuthExist({email: formik.values.email});
    } catch (e) {
      if (isAxiosError(e)) {
        const {response}: AxiosError<ResponseError> = e;
        formik.setErrors({email: response?.data.message});
      }
    }
  }

  const renderAgreement = (
    <s.Agreement>
      {"'다음' 버튼을 터치함므로써 "}
      <s.Link
        onPress={() =>
          navigation.navigate(SCREEN.WEB_VIEW, {
            uri: 'https://www.tastie.me/term-of-use',
          })
        }>
        서비스 약관
      </s.Link>
      {' 및 '}
      <s.Link
        onPress={() =>
          navigation.navigate(SCREEN.WEB_VIEW, {
            uri: 'https://www.tastie.me/privacy',
          })
        }>
        개인정보 처리방침
      </s.Link>
      {'에 동의합니다.'}
    </s.Agreement>
  );

  useEffect(() => {
    setSignupScreen({formik});
    // use setTimeout because of bug on iOS
    setTimeout(emailRef.current?.focus, 0);
    return () => {
      removeSignupScreen();
    };
  }, []);

  return (
    <StackView
      title="<b>이메일로</b> 시작하기"
      description={{
        message: '이미 계정이 있으신가요? <a>로그인하기</a>',
        onPress: () => navigation.navigate('Login'),
      }}
      dismiss={{icon: 'arrow', onPress: navigation.goBack}}
      pageButton={{
        message: '다음!',
        onPress: formik.handleSubmit,
        renderLeft: renderAgreement,
        disabled: !formik.isValid,
      }}>
      <TextInput
        name="email"
        value={formik.values.email}
        placeholder="이메일을 입력해주세요."
        error={formik.errors.email}
        ref={emailRef}
        keyboardType="email-address"
        onSubmitEditing={() => passwordRef.current?.focus()}
        hadSubmit={hadSubmit}
        onChangeText={formik.handleChange}
        onBlur={handleEmailBlur}
      />
      <TextInput
        name="password"
        value={formik.values.password}
        placeholder="비밀번호를 입력해주세요."
        error={formik.errors.password}
        secureTextEntry
        ref={passwordRef}
        onSubmitEditing={() => confirmPwdRef.current?.focus()}
        {...inputProps}
      />
      <TextInput
        name="confirmPwd"
        value={formik.values.confirmPwd}
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        error={formik.errors.confirmPwd}
        secureTextEntry
        ref={confirmPwdRef}
        returnKeyType="done"
        onSubmitEditing={formik.handleSubmit}
        {...inputProps}
      />
    </StackView>
  );
};

export default Signup;
