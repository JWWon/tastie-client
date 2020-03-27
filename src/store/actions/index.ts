import {AuthAction} from './auth';
import {CaseAction} from './case';
import {DeviceAction} from './device';
import {DiscoveriesAction} from './discoveries';
import {NavbarAction} from './navbar';

export type RootAction = AuthAction &
  CaseAction &
  DeviceAction &
  DiscoveriesAction &
  NavbarAction;
