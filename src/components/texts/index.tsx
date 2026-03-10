import React from "react";
import { Text as RNText, TextStyle, StyleProp, TextProps as RNTextProps } from "react-native";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingSizes: Record<HeadingLevel, number> = {
  1: 32,
  2: 26,
  3: 22,
  4: 18,
  5: 16,
  6: 14,
};

interface AppTextProps extends RNTextProps {
  level?: HeadingLevel;
  /** Shorthand heading props: h1, h2, h3, h4 (mirrors RNEUI Text API used throughout the codebase) */
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h1Style?: StyleProp<TextStyle>;
  h2Style?: StyleProp<TextStyle>;
  h3Style?: StyleProp<TextStyle>;
  h4Style?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

/**Reusable text component. Default font size 16, weight 400.
 * Supports h1–h4 shorthand props to match RNEUI Text API. */
const Text: React.FC<AppTextProps> = ({
  level,
  h1, h2, h3, h4,
  h1Style, h2Style, h3Style, h4Style,
  style,
  children,
  ...props
}) => {
  let resolvedLevel: HeadingLevel | undefined = level;
  let headingStyle: StyleProp<TextStyle> | undefined;

  if (h1) { resolvedLevel = 1; headingStyle = h1Style; }
  else if (h2) { resolvedLevel = 2; headingStyle = h2Style; }
  else if (h3) { resolvedLevel = 3; headingStyle = h3Style; }
  else if (h4) { resolvedLevel = 4; headingStyle = h4Style; }

  const fontSize = resolvedLevel ? headingSizes[resolvedLevel] : 16;
  const fontWeight = resolvedLevel ? ("700" as TextStyle["fontWeight"]) : ("400" as TextStyle["fontWeight"]);

  return (
    <RNText
      style={[{ fontSize, fontWeight }, headingStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
