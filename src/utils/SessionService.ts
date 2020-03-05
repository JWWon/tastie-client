import {CommonActions} from '@react-navigation/native';
import {FormikProps} from 'formik';

import {SCREEN} from '@utils/consts';
import {SessionNavigationProp} from '@navigations/Session';

interface ConfigInterface {
  navigation?: SessionNavigationProp<typeof SCREEN.WELCOME>;
  loginScreen?: {
    formik: FormikProps<{email: string; password: string}>;
  };
  signupScreen?: {
    formik: FormikProps<{email: string; password: string; confirmPwd: string}>;
  };
}

const config: ConfigInterface = {};

// NAVIGATION
export function setNavigation(nav: ConfigInterface['navigation']) {
  if (nav) config.navigation = nav;
}

export function navigate(name: string, params?: object) {
  const action = CommonActions.navigate({name, params});
  config.navigation?.dispatch(action);
}

export function goBack() {
  const action = CommonActions.goBack();
  config.navigation?.dispatch(action);
}
// END NAVIGATION

// LOGIN_SCREEN
export function setLoginScreen(loginScreen: ConfigInterface['loginScreen']) {
  if (loginScreen) config.loginScreen = loginScreen;
}

export function removeLoginScreen() {
  delete config.loginScreen;
}

export function useLoginFormik() {
  return config.loginScreen?.formik;
}
// END LOGIN_SCREEN

// SIGNUP_SCREEN
export function setSignupScreen(signupScreen: ConfigInterface['signupScreen']) {
  if (signupScreen) config.signupScreen = signupScreen;
}

export function removeSignupScreen() {
  delete config.signupScreen;
}

export function useSignupFormik() {
  return config.signupScreen?.formik;
}
// END SIGNUP_SCREEN
