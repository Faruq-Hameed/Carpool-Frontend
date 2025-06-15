import React from "react";
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressStepsProps {
    currentStep: number;
    totalSteps?: number;
    containerStyle?: ViewStyle;
}
// This component displays a progress bar for verification steps
/**Verification bar steps bar component */ //NOT YET COMPLETED

const VerificationStepsBar: React.FC<ProgressStepsProps> = ({
  currentStep,
  totalSteps = 4,
  containerStyle,
}) => {
  const stepsArray = Array.from({ length: totalSteps });

  return (
    <View style={[styles.progressContainer, containerStyle]}>
      {stepsArray.map((_, index) => {
        const stepNumber = index + 1;

        const stepStyle: ViewStyle[] = [styles.progressStep];
        if (stepNumber < currentStep) {
          stepStyle.push(styles.completedStep);
        } else if (stepNumber === currentStep) {
          stepStyle.push(styles.activeStep);
        }

        return <View key={index} style={stepStyle} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: '#28a745',
  },
  completedStep: {
    backgroundColor: '#28a745',
  },
});

export default VerificationStepsBar;