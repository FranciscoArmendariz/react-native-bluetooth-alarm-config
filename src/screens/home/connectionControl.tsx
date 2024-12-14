import {BluetoothDevice} from 'react-native-bluetooth-classic';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Accordion} from '../../components/accordion/accordion';
import {ArrowFoward} from '../../assets';
import React from 'react';
import {DeviceInfo} from './deviceInfo';

export type BondedDevicesProps = {
  bondedDevices: BluetoothDevice[];
};

export function ConnectionControl({bondedDevices}: BondedDevicesProps) {
  const isOpen = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: isOpen.value ? '-90deg' : '90deg',
      },
    ],
  }));

  return (
    <View style={styles.connectionControl}>
      <TouchableOpacity onPress={() => (isOpen.value = !isOpen.value)}>
        <View style={styles.accordionButton}>
          <Text style={styles.title}>Control de conexiones</Text>
          <Animated.View style={animatedStyle}>
            <ArrowFoward />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Accordion isExpanded={isOpen} viewKey="-ConnectionControl">
        {bondedDevices.map((device, index) => {
          return (
            <DeviceInfo
              key={`${device.name}-${device.address}-${index}`}
              device={device}
            />
          );
        })}
      </Accordion>
    </View>
  );
}
