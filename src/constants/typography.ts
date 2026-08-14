import {TextStyle} from 'react-native';

export const Typography = {
  display: {
    fontFamily: 'Lora-Bold',
    fontSize: 38,
    lineHeight: 48,
  },

  heading1: {
    fontFamily: 'Lora-Bold',
    fontSize: 32,
    lineHeight: 42,
  },

  heading2: {
    fontFamily: 'Lora-Bold',
    fontSize: 28,
    lineHeight: 38,
  },

  heading3: {
    fontFamily: 'Lora-Bold',
    fontSize: 24,
    lineHeight: 34,
  },

  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    lineHeight: 32,
  },

  bodySmall: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 28,
  },

  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    letterSpacing: 1,
  },

  meta: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
  },

  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
} satisfies Record<
  string,
  TextStyle
>;

export default Typography;