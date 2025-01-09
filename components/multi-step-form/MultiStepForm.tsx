import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from './ProgressBar';
import { StepWrapper } from './StepWrapper';

interface MultiStepFormProps {
  steps: React.ReactNode[];
  onCancel: () => void;
  onSubmit: () => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onCancel,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep + 1} totalSteps={steps.length} />
      <StepWrapper
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCancel={onCancel}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
      >
        {steps[currentStep]}
      </StepWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
