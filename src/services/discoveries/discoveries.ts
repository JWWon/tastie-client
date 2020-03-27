import axios, {AxiosResponse} from 'axios';
import {
  GetDiscoveriesReq,
  GetDiscoveriesRes,
  DiscoveryDetail,
} from './discoveries.type';

const BASE_URL = '/recommendations';

export const getDiscoveries = (params: GetDiscoveriesReq) =>
  axios.get<GetDiscoveriesReq, AxiosResponse<GetDiscoveriesRes>>(BASE_URL, {
    params,
  });

export const getDiscovery = (placeID: string) =>
  axios.get<undefined, AxiosResponse<DiscoveryDetail>>(
    `${BASE_URL}/${placeID}`,
  );
