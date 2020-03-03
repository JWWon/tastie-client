import {AuthAction} from './auth';
import {CaseAction} from './case';
import {DeviceAction} from './device';
import {NavbarAction} from './navbar';
import {RecommendationsAction} from './recommendations';

export type RootAction = AuthAction &
  CaseAction &
  DeviceAction &
  NavbarAction &
  RecommendationsAction;
