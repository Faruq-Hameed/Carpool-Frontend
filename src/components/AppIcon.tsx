import { Image, TouchableOpacity } from "react-native";

import { IconName, icons } from "@/helpers/icons";
type IconProps = {
  name: IconName;
  size?: number;
  onPress?: () => void;
};

/**App icon component image component containing images from the icon list */
export function AppIcon({ name, size = 24, onPress }: IconProps) {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={icons[name]} style={{ width: size, height: size }} />
      </TouchableOpacity>
    );
  }
  return <Image source={icons[name]} style={{ width: size, height: size }} />;
}
