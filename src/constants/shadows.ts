import { Platform, ViewStyle } from 'react-native';

const androidElevation = (
  elevation: number,
): ViewStyle => ({
  elevation,
});

const iosShadow = (
  opacity: number,
  radius: number,
  offsetY: number,
): ViewStyle => ({
  shadowColor: '#000',
  shadowOpacity: opacity,
  shadowRadius: radius,
  shadowOffset: {
    width: 0,
    height: offsetY,
  },
});

const Shadow = {
  none: {},

  sm:
    Platform.OS === 'ios'
      ? iosShadow(0.08, 2, 1)
      : androidElevation(2),

  md:
    Platform.OS === 'ios'
      ? iosShadow(0.12, 4, 2)
      : androidElevation(4),

  lg:
    Platform.OS === 'ios'
      ? iosShadow(0.16, 8, 4)
      : androidElevation(8),

  xl:
    Platform.OS === 'ios'
      ? iosShadow(0.20, 12, 6)
      : androidElevation(12),
};

export default Shadow;