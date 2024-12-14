import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {create} from 'zustand';

export type BluetoothStore = {
  connectedDevices: BluetoothDevice[];
  addConnectedDevice: (device: BluetoothDevice) => void;
  removeConnectedDevice: (device: BluetoothDevice) => void;
  clearConnectedDevices: () => void;
  isConnecting: boolean;
  setIsConnecting: (value: boolean) => void;
};

export const useBluetoothStore = create<BluetoothStore>((set, get) => ({
  connectedDevices: [],
  isConnecting: false,
  addConnectedDevice: device =>
    set({connectedDevices: [...get().connectedDevices, device]}),
  removeConnectedDevice: device => {
    const newArray = get().connectedDevices.filter(
      d => d.name !== device.name || d.address !== device.address,
    );
    set({connectedDevices: newArray});
  },
  clearConnectedDevices: () => set({connectedDevices: []}),
  setIsConnecting: value => set({isConnecting: value}),
}));
