import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {styles} from './styles';
import {checkPermissions} from '../../utils/bluetooth';

import {ConnectionControl} from './connectionControl';
import {AlarmConfig} from './alarmConfig';
import {logo} from '../../assets';

export function Home() {
  const [permissionsGranted, setPermissionsGranted] = useState<boolean | null>(
    null,
  );

  const [bondedDevices, setBondedDevices] = useState<BluetoothDevice[]>([]);

  useEffect(() => {
    checkPermissions().then(result => setPermissionsGranted(result));
  }, []);

  useEffect(() => {
    if (permissionsGranted) {
      RNBluetoothClassic.getBondedDevices().then(devices => {
        setBondedDevices(devices);
      });
    }
  }, [permissionsGranted]);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>ALARMA ARDUINO</Text>
          <Image style={styles.logo} width={10} height={10} source={logo} />
        </View>
      </>
      <ScrollView>
        {permissionsGranted === undefined ? (
          <ActivityIndicator />
        ) : (
          <View>
            {!permissionsGranted ? (
              <View style={styles.permissionsBody}>
                <Text style={styles.title}>
                  Please allow all permissions in app settings
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.body}>
                  <ConnectionControl bondedDevices={bondedDevices} />
                  <AlarmConfig />
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
