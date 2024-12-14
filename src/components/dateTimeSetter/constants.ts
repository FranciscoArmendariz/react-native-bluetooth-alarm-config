import {
  buildAlarmMessage,
  buildDateMessage,
  buildTimeMessage,
} from '../../utils/dateTime';

export enum DateTimeSetterModes {
  DATE = 'DATE',
  TIME = 'TIME',
  ALARM = 'ALRM',
}

export const BUILDERS_BY_MODE = {
  [DateTimeSetterModes.DATE]: buildDateMessage,
  [DateTimeSetterModes.TIME]: buildTimeMessage,
  [DateTimeSetterModes.ALARM]: buildAlarmMessage,
};

export const TITLES_BY_MODE = {
  [DateTimeSetterModes.DATE]: 'Ajustar fecha',
  [DateTimeSetterModes.TIME]: 'Ajustar hora',
  [DateTimeSetterModes.ALARM]: 'Ajustar Alarma',
};
