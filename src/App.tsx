import Toast from 'react-native-toast-message';
import {Home} from './screens';

import React from 'react';
import {View} from 'react-native';
function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Home />
      <Toast />
    </View>
  );
}
export default App;
