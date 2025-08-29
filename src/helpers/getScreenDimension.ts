import { Dimensions } from 'react-native';

/**Helper function to get responsive width */
export const getResponsiveWidth = (factor = 1) => {
  const screenWidth = Dimensions.get('window').width;
  return screenWidth * factor;
};


/**Helper function to get responsive height */
export const getResponsiveHeight = (factor = 1) => {
  const screenHeight = Dimensions.get('window').height;
  return screenHeight * factor;
};