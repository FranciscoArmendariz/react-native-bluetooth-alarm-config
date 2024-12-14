import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {styles} from './styles';

export type AccordeonProps = {
  isExpanded: SharedValue<boolean>;
  children: ReactNode;
  viewKey: String;
  style?: ViewStyle;
  duration?: number;
};

export function Accordion({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: AccordeonProps) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  );
}
