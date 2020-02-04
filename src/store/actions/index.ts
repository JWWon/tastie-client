import {CaseAction} from './case';
import {DeviceAction} from './device';
import {MessageAction} from './message';

export type RootAction = CaseAction & DeviceAction & MessageAction;
