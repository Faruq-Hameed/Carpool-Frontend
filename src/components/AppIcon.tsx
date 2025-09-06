import { Image } from "react-native";

import { IconName, icons } from "@/helpers/icons";
type IconProps = {
  name: IconName;
  size?: number;
};

/**App icon component image component containing images from the icon list */
export function AppIcon({ name, size = 24 }: IconProps) {
  return <Image source={icons[name]} style={{ width: size, height: size }} />;
}
