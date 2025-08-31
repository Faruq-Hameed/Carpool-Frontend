import React from 'react';
import { Text as ThemeText, TextProps } from '@rneui/themed';
import { TextStyle, StyleProp } from 'react-native';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface AppTextProps extends TextProps {
  level?: HeadingLevel;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

/**Reusable text component that can be used throughout the app. */
const Text: React.FC<AppTextProps> = ({ level, style, children, ...props }) => {
  // Dynamically build heading prop for RNEUI
  const headingProp =
    level && level >= 1 && level <= 6
      ? { [`h${level}`]: true }
      : {};

  return (
    <ThemeText {...headingProp} style={style} {...props}>
      {children}
    </ThemeText>
  );
};

export default Text;