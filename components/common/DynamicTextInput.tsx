import React, { useState } from "react";
import { TextInput, TextInputProps, StyleSheet, View } from "react-native";

interface DynamicTextInputProps extends TextInputProps {
  defaultHeight?: number; // Optional: Default height of the TextInput
}

const DynamicTextInput: React.FC<DynamicTextInputProps> = ({
  defaultHeight = 40, // Default height fallback
  style,
  ...props
}) => {
  const [inputHeight, setInputHeight] = useState<number>(defaultHeight);

  const handleContentSizeChange = (event: any) => {
    setInputHeight(event.nativeEvent.contentSize.height); // Dynamically update height
  };

  return (
    <View>
      <TextInput
        multiline
        onContentSizeChange={handleContentSizeChange}
        style={[
          styles.textInput,
          { height: Math.max(defaultHeight, inputHeight) },
          style,
        ]} // Combine styles
        {...props} // Spread all other props
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    minWidth: 300,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default DynamicTextInput;
