/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {styles} from './styles';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {useEffect, useState} from 'react';
import {connectToDevice, dissconectDevice} from '../../utils/bluetooth';
import {useBluetoothStore} from '../../services/store';

export type DeviceProps = {
  device: BluetoothDevice;
};

export function DeviceInfo({device}: DeviceProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkConnection = () => {
    return device.isConnected().then(res => {
      setIsConnected(res);
    });
  };

  useEffect(() => {
    if (isConnected === null) {
      checkConnection();
    }
  }, []);

  const bluetoothStore = useBluetoothStore(state => state);

  return (
    <View style={styles.bondedDevice}>
      <View>
        <Text>{`NAME: ${device.name}`}</Text>
        <Text>{`ADRESS: ${device.address}`}</Text>
      </View>
      {isConnected === null ? (
        <ActivityIndicator />
      ) : (
        <Button
          disabled={bluetoothStore.isConnecting}
          onPress={() => {
            const action = isConnected ? dissconectDevice : connectToDevice;
            bluetoothStore.setIsConnecting(true);
            action(device)
              .then(() => {
                if (isConnected) {
                  bluetoothStore.removeConnectedDevice(device);
                } else {
                  bluetoothStore.addConnectedDevice(device);
                }
              })
              .finally(() =>
                checkConnection().then(() =>
                  bluetoothStore.setIsConnecting(false),
                ),
              );
          }}
          title={isConnected ? 'DESCONECTAR' : 'CONECTAR'}
          color={isConnected ? '#b01a1a' : '#2023be'}
        />
      )}
    </View>
  );
}
