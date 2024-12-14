/* eslint-disable react/react-in-jsx-scope */
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import {writeMessage} from '../../utils/bluetooth';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {
  BUILDERS_BY_MODE,
  DateTimeSetterModes,
  TITLES_BY_MODE,
} from './constants';
import {styles} from './styles';

export type DateTimeSetterProps = {
  device: BluetoothDevice;
  mode: DateTimeSetterModes;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export function DateTimeSetter({
  device,
  mode,
  style,
  containerStyle,
  textStyle,
}: DateTimeSetterProps) {
  return (
    <TouchableHighlight
      style={[styles.containerStyle, containerStyle]}
      underlayColor={'#cacaca'}
      onPress={() =>
        DateTimePickerAndroid.open({
          value: new Date(),
          mode: mode === DateTimeSetterModes.DATE ? 'date' : 'time',
          minimumDate: new Date(2000, 0, 2),
          maximumDate: new Date(2099, 11, 31),
          onChange: (event, newDate) => {
            if (event.type !== 'set') {
              return;
            }
            if (newDate) {
              const message = BUILDERS_BY_MODE[mode](newDate);
              writeMessage(device, message);
            }
          },
        })
      }>
      {
        <View style={[styles.button, style]}>
          <Text style={[styles.buttonText, textStyle]}>
            {TITLES_BY_MODE[mode]}
          </Text>
        </View>
      }
    </TouchableHighlight>
  );
}
