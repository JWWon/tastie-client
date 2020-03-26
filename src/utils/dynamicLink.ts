import queryString from 'query-string';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {SCREEN} from '@utils/consts';

const LINK_URL = 'https://app.tastie.me';
const config: {appStarted: boolean} = {appStarted: false};

type Navigate = (name: string, params?: object) => void;

export function handleLinkDetailScreen(url: string, navigate: Navigate) {
  if (__DEV__) console.info(`GET_DYNAMIC_LINK: ${url}`);
  const parsedUrl = queryString.parseUrl(url);
  if (parsedUrl.url === `${LINK_URL}/discovery`) {
    navigate(SCREEN.DISCOVERY_DETAIL, parsedUrl.query);
  }
}

export async function getInitialLink(navigate: Navigate) {
  if (config.appStarted) return;
  config.appStarted = true;

  const link = await dynamicLinks().getInitialLink();
  if (!link) return;

  handleLinkDetailScreen(link.url, navigate);
}
