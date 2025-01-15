import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import { colors } from "../ui/colors";

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
        <Button className="p-3" onPress={onCancel}>
          <ButtonText style={styles.buttonText}>Cancel</ButtonText>
        </Button>

        {!isFirstStep && (
          <Button className="p-3" onPress={onPrevious}>
            <ButtonText style={styles.buttonText}>Previous</ButtonText>
          </Button>
        )}
        <Button className="p-3" onPress={onNext}>
          <ButtonText style={styles.buttonText}>
            {isLastStep ? "Submit" : "Next"}
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 12,
  },
  content: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
