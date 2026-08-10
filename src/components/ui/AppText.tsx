import React from 'react';

import {
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

import Typography from '../../constants/typography';

type TypographyVariant =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'meta'
  | 'button';

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export default function AppText({
  variant = 'body',
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        Typography[variant],
        style,
      ]}
    >
      {children}
    </Text>
  );
}