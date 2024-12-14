/* eslint-disable react/react-in-jsx-scope */
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {styles} from './styles';
import {Text, View} from 'react-native';
import {DateTimeSetter} from '../../components/dateTimeSetter';
import {DateTimeSetterModes} from '../../components/dateTimeSetter/constants';

export type DeviceControlProps = {
  device: BluetoothDevice;
};

export function DeviceControl({device}: DeviceControlProps) {
  return (
    <View style={styles.deviceControl}>
      <Text style={styles.title}>{device.name}:</Text>
      <View style={styles.dateTimeRow}>
        <DateTimeSetter
          style={styles.dateTimeSetter}
          textStyle={styles.dateTimeSetterText}
          device={device}
          mode={DateTimeSetterModes.DATE}
        />
        <DateTimeSetter
          style={styles.dateTimeSetter}
          textStyle={styles.dateTimeSetterText}
          device={device}
          mode={DateTimeSetterModes.TIME}
        />
      </View>
      <DateTimeSetter
        style={styles.alarmSetter}
        device={device}
        mode={DateTimeSetterModes.ALARM}
      />
    </View>
  );
}
