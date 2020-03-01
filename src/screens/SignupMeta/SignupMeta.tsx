import React, {useEffect, useState, useRef} from 'react';
import {TextInput as InputType} from 'react-native';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {SessionParamList} from '@navigations/Session';
import StackView from '@components/templates/StackView';
import TextInput from '@components/molcules/TextInput';
import {signup} from '@store/actions/auth';

interface Props {
  navigation: StackNavigationProp<SessionParamList, 'SignupMeta'>;
  route: RouteProp<SessionParamList, 'SignupMeta'>;
}

const SignupMeta: React.FC<Props> = ({navigation, route}) => {
  const [hadSubmit, setHadSubmit] = useState<boolean>(false);
  const nameRef = useRef<InputType>(null);
  const birthYearRef = useRef<InputType>(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {name: '', birthYear: ''},
    validationSchema: yup.object().shape({
      name: yup.string().required('이름을 입력해주세요.'),
      birthYear: yup.string().notRequired(),
    }),
    validateOnMount: true,
    onSubmit: ({name, birthYear}) => {
      if (!hadSubmit) setHadSubmit(true);
      dispatch(
        signup.request({
          ...route.params,
          birthYear: birthYear ? parseInt(birthYear, 10) : undefined,
          name,
        }),
      );
    },
  });

  const inputProps = {
    hadSubmit,
    onChangeText: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  const handleDismiss = () => navigation.goBack();

  useEffect(() => {
    // Use setTimeout because of bug on iOS
    setTimeout(nameRef.current?.focus, 0);
  }, []);

  return (
    <StackView
      title="거의 <b>다</b> 왔어요!"
      description={{message: '고양이에게 누구인지 알려주세요.'}}
      dismiss={{icon: 'arrow', onPress: handleDismiss}}
      pageButton={{
        message: '시작!',
        onPress: formik.handleSubmit,
        disabled: !formik.isValid,
      }}>
      <TextInput
        name="name"
        value={formik.values.name}
        placeholder="이름을 입력해주세요."
        error={formik.errors.name}
        ref={nameRef}
        onSubmitEditing={() => birthYearRef.current?.focus()}
        {...inputProps}
      />
      <TextInput
        name="birthYear"
        value={formik.values.birthYear}
        placeholder="(선택) 태어난 해를 입력해주세요."
        error={formik.errors.birthYear}
        ref={birthYearRef}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={formik.handleSubmit}
        {...inputProps}
      />
    </StackView>
  );
};

export default SignupMeta;
