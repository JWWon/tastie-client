import React, {Fragment} from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import version from 'react-native-version-number';

import BaseView from '@components/templates/BaseView';
import {RootState} from '@store/reducers';
import {RootNavigationProp} from '@navigations/Root';
import {SCREEN} from '@utils/consts';
import {logout} from '@store/actions/auth';
import * as s from './Profile.style';

interface Content {
  title: string;
  onPress?: () => void;
}

interface Props {
  navigation: RootNavigationProp<typeof SCREEN.PROFILE>;
}

const year = moment().get('year');

const Profile: React.FC<Props> = ({navigation}) => {
  const {name, email} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const contents: Content[] = [
    {
      title: '서비스 약관',
      onPress: () =>
        navigation.navigate(SCREEN.WEB_VIEW, {
          uri: 'https://www.tastie.me/term-of-use',
        }),
    },
    {
      title: '개인정보 처리방침',
      onPress: () =>
        navigation.navigate(SCREEN.WEB_VIEW, {
          uri: 'https://www.tastie.me/privacy',
        }),
    },
    {title: '로그아웃', onPress: () => dispatch(logout())},
    {title: `현재 버전 ${version.appVersion}`},
  ];

  return (
    <BaseView>
      <s.Title message="내 <b>프로필</b>" />
      <s.ProfileWrapper>
        <s.EmptyThumbnail />
        <s.UserName>{name}</s.UserName>
        <s.Email>{email}</s.Email>
      </s.ProfileWrapper>

      {contents.map((item, idx) => (
        <Fragment key={idx.toString()}>
          {idx !== 0 && <s.Divider />}
          <s.ContentLink
            onPress={item.onPress}
            disabled={item.onPress === undefined}>
            <s.ContentTitle>{item.title}</s.ContentTitle>
          </s.ContentLink>
        </Fragment>
      ))}

      <s.Footer>
        <s.Copyright>© {year} Tastie Guys, All rights reserved.</s.Copyright>
      </s.Footer>
    </BaseView>
  );
};

export default Profile;
