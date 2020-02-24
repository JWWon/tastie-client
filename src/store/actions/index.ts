import {AuthAction} from './auth';
import {CaseAction} from './case';
import {DeviceAction} from './device';
import {MessageAction} from './message';

export type RootAction = AuthAction & CaseAction & DeviceAction & MessageAction;
