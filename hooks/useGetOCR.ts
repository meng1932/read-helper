import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface Options {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const useOCR = (options?: Options) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const mutateAsync = async (imageUri: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const storedApiKey = await AsyncStorage.getItem("OCR_API_KEY");
      const ocrApiUrl = "https://api.ocr.space/parse/image";

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpeg",
      } as any); // "as any" is used to avoid TypeScript errors for React Native FormData.

      formData.append("apikey", storedApiKey || ""); // Replace with your OCR API key
      formData.append("language", "eng"); // Specify the OCR language (e.g., "eng" for English)

      const response = await axios.post(ocrApiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { ParsedResults, OCRExitCode, ErrorMessage } = response.data;

      if (OCRExitCode === 1) {
        // Successful OCR processing
        setData(ParsedResults);
        if (options?.onSuccess) {
          options.onSuccess(ParsedResults[0].ParsedText);
        }
      } else {
        // OCR failed
        const errorMessage = ErrorMessage || "OCR processing failed.";
        setError(errorMessage);
        if (options?.onError) {
          options.onError(errorMessage);
        }
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "An error occurred.";
      Alert.alert("Error", err?.response?.data || "An error occurred");
      setError(errorMessage);
      if (options?.onError) {
        options.onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, mutateAsync };
};

export default useOCR;
