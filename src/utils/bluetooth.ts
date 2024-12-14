import {PermissionsAndroid} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import Toast from 'react-native-toast-message';
export const checkPermissions = async () => {
  const locationGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (!locationGranted) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('RESULT LOCATION:', result);
    if (result !== 'granted') {
      return false;
    }
  }

  const scanGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  );

  const connectGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  );

  if (!scanGranted || !connectGranted) {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);
    console.log('RESULT BLUETOOTH:', result);
    if (
      result['android.permission.BLUETOOTH_CONNECT'] !== 'granted' ||
      result['android.permission.BLUETOOTH_SCAN'] !== 'granted'
    ) {
      return false;
    }
  }

  return true;
};

export const connectToDevice = async (device: BluetoothDevice) => {
  try {
    const connected = await device.connect({
      secureSocket: false,
    });
    if (connected) {
      Toast.show({type: 'success', text1: 'CONNECTION SUCCESSFULL'});
      return;
    }
    const message = 'CONNECTION UNSUCCESSFULL';
    Toast.show({type: 'error', text1: message});
    throw message;
  } catch (error) {
    const message = 'CONNECTION ATTEMPT FAILED ';
    Toast.show({type: 'error', text1: message, text2: `${error}`});
    throw message + error;
  }
};

export const dissconectDevice = async (device: BluetoothDevice) => {
  try {
    const success = await device.disconnect();
    if (success) {
      Toast.show({type: 'success', text1: 'DISCONNECTION SUCCESSFULL'});
      return;
    }
    const message = 'DISCONNECTION UNSUCCESSFULL';
    Toast.show({type: 'error', text1: message});
    throw message;
  } catch (error) {
    const message = 'DISCONNECTION ATTEMPT FAILED ';
    Toast.show({type: 'error', text1: message, text2: `${error}`});
    throw message + error;
  }
};

export const writeMessage = async (
  device: BluetoothDevice,
  message: string,
) => {
  try {
    const success = await device.write(message, 'ascii');
    if (success) {
      Toast.show({type: 'success', text1: 'MESSAGE SENT'});
      return;
    }
    const resultMessage = "MESSAGE WASN'T SENT";
    Toast.show({type: 'error', text1: resultMessage});
    throw resultMessage;
  } catch (error) {
    const resultMessage = 'ATTEMPT TO SENT MESSAGE FAILED ';
    Toast.show({type: 'error', text1: resultMessage, text2: `${error}`});
    throw resultMessage + error;
  }
};
