/* eslint-disable react/react-in-jsx-scope */
import {Text, TouchableOpacity, View} from 'react-native';
import {useBluetoothStore} from '../../services/store';
import {styles} from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ArrowFoward} from '../../assets';
import {DeviceControl} from './deviceControl';
import {Accordion} from '../../components/accordion/accordion';
import {useEffect} from 'react';

export function AlarmConfig() {
  const isOpen = useSharedValue(false);

  const connectedDevices = useBluetoothStore(state => state.connectedDevices);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: isOpen.value ? '-90deg' : '90deg',
      },
    ],
  }));

  useEffect(() => {
    isOpen.value = connectedDevices.length > 0;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedDevices]);

  return (
    <View style={styles.alarmConfig}>
      <TouchableOpacity onPress={() => (isOpen.value = !isOpen.value)}>
        <View style={styles.accordionButton}>
          <Text style={styles.title}>Configuración de alarma</Text>
          <Animated.View style={animatedStyle}>
            <ArrowFoward />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Accordion isExpanded={isOpen} viewKey="-AlarmConfig">
        {connectedDevices.map((device, index) => {
          return (
            <DeviceControl
              key={`${device.name}-${device.address}-${index}-DeviceControl`}
              device={device}
            />
          );
        })}
      </Accordion>
    </View>
  );
}
