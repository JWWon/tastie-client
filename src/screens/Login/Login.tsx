import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextInput as InputType} from 'react-native';
import {useFormik, FormikProps} from 'formik';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

import {setLoginScreen, removeLoginScreen} from '@utils/SessionService';
import {SessionParamList} from '@navigations/Session';
import {loginWithEmail} from '@store/actions/auth';
import StackView from '@components/templates/StackView';
import TextInput from '@components/molcules/TextInput';

interface Props {
  navigation: StackNavigationProp<SessionParamList, 'Login'>;
}

const Login: React.FC<Props> = ({navigation}) => {
  const [hadSubmit, setHadSubmit] = useState<boolean>(false);
  const emailRef = useRef<InputType>(null);
  const passwordRef = useRef<InputType>(null);

  const dispatch = useDispatch();

  const formik: FormikProps<{email: string; password: string}> = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('올바른 이메일을 입력해주세요.')
        .required('이메일을 꼭 입력해주세요.'),
      password: yup.string().required('비밀번호를 꼭 입력해주세요.'),
    }),
    validateOnMount: true,
    onSubmit: values => {
      if (!hadSubmit) setHadSubmit(true);
      dispatch(loginWithEmail.request(values));
    },
  });

  const inputProps = {
    hadSubmit,
    onChangeText: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  useEffect(() => {
    setLoginScreen({formik});
    // use setTimeout because of bug on iOS
    setTimeout(emailRef.current?.focus, 0);
    return () => {
      removeLoginScreen();
    };
  }, []);

  return (
    <StackView
      title="<b>이메일</b>로 로그인하기"
      description={{
        message: '<a>비밀번호를 잊어버리셨나요?</a>',
        onPress: () => console.log('비밀번호 찾기'),
      }}
      dismiss={{icon: 'arrow', onPress: navigation.goBack}}
      pageButton={{
        message: '시작!',
        onPress: formik.handleSubmit,
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
        {...inputProps}
      />
      <TextInput
        name="password"
        value={formik.values.password}
        placeholder="비밀번호를 입력해주세요."
        error={formik.errors.password}
        secureTextEntry
        ref={passwordRef}
        returnKeyType="done"
        onSubmitEditing={formik.handleSubmit}
        {...inputProps}
      />
    </StackView>
  );
};

export default Login;
