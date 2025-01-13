import React, { useState } from 'react';  
import { View, StyleSheet } from 'react-native';  
import { ProgressBar } from './ProgressBar';  
import { StepWrapper } from './StepWrapper';  

interface MultiStepFormProps {  
  steps: React.ReactNode[];  
  onCancel: () => void;  
  onSubmit: () => void;  
  onStepChange?: (stepIndex: number) => void; // New optional prop  
}  

export const MultiStepForm: React.FC<MultiStepFormProps> = ({  
  steps,  
  onCancel,  
  onSubmit,  
  onStepChange, // Added to destructuring  
}) => {  
  const [currentStep, setCurrentStep] = useState(0);  

  const handleNext = () => {  
    if (currentStep < steps.length - 1) {  
      const newStep = currentStep + 1;  
      setCurrentStep(newStep);  
      if (onStepChange) {  
        onStepChange(newStep); // Call onStepChange only on step change  
      }  
    } else {  
      onSubmit();  
    }  
  };  

  const handlePrevious = () => {  
    if (currentStep > 0) {  
      const newStep = currentStep - 1;  
      setCurrentStep(newStep);  
      if (onStepChange) {  
        onStepChange(newStep); // Call onStepChange only on step change  
      }  
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