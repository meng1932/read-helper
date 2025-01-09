import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.container}>
      {[...Array(totalSteps)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < currentStep ? styles.completedStep : styles.incompleteStep,
          ]}
        >
          <Text style={styles.stepText}>{index + 1}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
  },
  completedStep: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  incompleteStep: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  stepText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
