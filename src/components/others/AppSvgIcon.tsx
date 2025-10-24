import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

const PencilSimpleLine = require("@assets/icons/svg/PencilSimpleLine.svg");
const SealCheck = require("@assets/icons/svg/SealCheck.svg");

const svgIcons = {
  pencilSimpleLine: PencilSimpleLine,
  sealCheck: SealCheck,
};

export type SvgIconName = keyof typeof svgIcons;

type SvgIconProps = {
  name: SvgIconName;
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
};

export function AppSvgIcon({ name, size = 24, style, onPress }: SvgIconProps) {
  const IconComponent = svgIcons[name];
  if (onPress) {
    //i.e the icon should have event handler
    return (
      <TouchableOpacity onPress={onPress}>
        <IconComponent width={size} height={size} style={style} />
      </TouchableOpacity>
    );
  }
  return <IconComponent width={size} height={size} style={style} />;
}

export default AppSvgIcon;