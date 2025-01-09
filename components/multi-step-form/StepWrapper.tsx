import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface StepWrapperProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({
  children,
  onNext,
  onPrevious,
  onCancel,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onCancel} />
        {!isFirstStep && <Button title="Previous Step" onPress={onPrevious} />}
        {!isLastStep ? (
          <Button title="Next Step" onPress={onNext} />
        ) : (
          <Button title="Submit" onPress={onNext} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
