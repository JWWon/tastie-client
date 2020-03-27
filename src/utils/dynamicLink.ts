import {Linking} from 'react-native';
import queryString from 'query-string';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {SCREEN} from '@utils/consts';

const config: {appStarted: boolean} = {appStarted: false};

type Navigate = (name: string, params?: object) => void;

export function handleLinkDetailScreen(url: string, navigate: Navigate) {
  if (__DEV__) console.info(`GET_DYNAMIC_LINK: ${url}`);
  const parsedUrl = queryString.parseUrl(url);
  if (/\/discovery$/.test(parsedUrl.url)) {
    // https://{{APP_IDENTIFIER}}/discovery
    navigate(SCREEN.DISCOVERY_DETAIL, parsedUrl.query);
  }
}

export async function getInitialLink(navigate: Navigate) {
  if (config.appStarted) return;
  config.appStarted = true;

  const link = await Promise.all([
    Linking.getInitialURL(),
    dynamicLinks().getInitialLink(),
  ]);
  const url: string | null = (link[1] ? link[1].url : null) || link[0];
  if (!url) return;

  handleLinkDetailScreen(url, navigate);
}
