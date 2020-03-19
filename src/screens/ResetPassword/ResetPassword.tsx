import React, {useState, useRef, useEffect} from 'react';
import {TextInput as InputType} from 'react-native';
import {FormikProps, useFormik} from 'formik';
import * as yup from 'yup';

import {SessionNavigationProp} from '@navigations/Session';
import {ConfirmEmail} from '@services/auth';
import * as api from '@services/auth';
import {SCREEN} from '@utils/consts';
import StackView from '@components/templates/StackView';
import TextInput from '@components/molcules/TextInput';

interface Props {
  navigation: SessionNavigationProp<typeof SCREEN.RESET_PASSWORD>;
}

const ResetPassword: React.FC<Props> = ({navigation}) => {
  const [hadSubmit, setHadSubmit] = useState<boolean>(false);
  const emailRef = useRef<InputType>(null);

  const formik: FormikProps<ConfirmEmail> = useFormik({
    initialValues: {email: ''},
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('올바른 이메일을 입력해주세요.')
        .required('이메일을 꼭 입력해주세요.'),
    }),
    validateOnMount: true,
    onSubmit: values => {
      if (!hadSubmit) setHadSubmit(true);
      api
        .confirmEmail(values)
        .then(() => navigation.navigate(SCREEN.CONFIRM_EMAIL))
        .catch(e => console.warn(e.response));
    },
  });

  const inputProps = {
    hadSubmit,
    onChangeText: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  useEffect(() => {
    setTimeout(emailRef.current?.focus, 0);
  }, []);

  return (
    <StackView
      title="<b>비밀번호</b> 재설정하기"
      description={{message: '가입하셨던 이메일을 알려주세요.'}}
      dismiss={{icon: 'arrow', onPress: navigation.goBack}}
      pageButton={{
        message: '다음!',
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
        returnKeyType="done"
        onSubmitEditing={formik.handleSubmit}
        {...inputProps}
      />
    </StackView>
  );
};

export default ResetPassword;
