import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Camera, CameraView, CameraType } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator"; // Import ImageManipulator
import * as FileSystem from "expo-file-system"; // Import FileSystem
import { ButtonText, Button } from "./ui/button";

const CameraWindow = ({
  capturedPhoto,
  setCapturedPhoto,
}: {
  capturedPhoto: string | null;
  setCapturedPhoto: (photoUri: string | null) => void;
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const cameraRef = useRef<CameraView | null>(null);

  // Request camera permissions
  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to use this feature."
      );
    }
  };

  // Switch between front and back camera
  const switchCamera = () => {
    setFacing((prevType) => (prevType === "back" ? "front" : "back"));
  };

  // Capture photo
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const compressedPhoto = await compressImage(photo?.uri || "");
        // console.log(`Compressed image size: ${compressedSize} bytes`); // Log the size
        setCapturedPhoto(compressedPhoto || null);
        setIsCameraActive(false);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const compressImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      // Get file size
      const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
      const fileSizeInBytes = fileInfo.size;
      const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

      console.log(`Compressed Image Size:`);
      console.log(`- Bytes: ${fileSizeInBytes}`);
      console.log(`- Kilobytes: ${fileSizeInKB} KB`);
      console.log(`- Megabytes: ${fileSizeInMB} MB`);

      return manipResult.uri;
    } catch (error) {
      console.error("Error compressing image:", error);
      return null;
    }
  };
  // Start the camera
  const startCamera = async () => {
    await requestPermission();
    if (hasPermission) {
      setIsCameraActive(true);
    }
  };
  const discardPhoto = () => {
    setCapturedPhoto(null);
  };
  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <CameraView ratio='16:9' style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={switchCamera}
            >
              <Text style={styles.controlText}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={takePicture}
            >
              <Text style={styles.controlText}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsCameraActive(false)}
            >
              <Text style={styles.controlText}>Close</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.options}>
          {capturedPhoto && (
            <Image source={{ uri: capturedPhoto }} style={styles.preview} />
          )}
          <View style={styles.actionBtns}>
            {capturedPhoto && (
              <Button className="p-3" onPress={discardPhoto}>
                <ButtonText style={styles.buttonText}>Discard</ButtonText>
              </Button>
            )}
            <Button className="p-3" onPress={startCamera}>
              <ButtonText style={styles.buttonText}>
                {capturedPhoto ? "Retake" : "Open Camera"}
              </ButtonText>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "80%",
  },
  cameraControls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    padding: 16,
  },
  controlButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  actionBtns: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  controlText: {
    fontSize: 16,
    color: "black",
  },
  options: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginTop: 16,
  },
  optionText: {
    color: "white",
    fontSize: 18,
  },
  preview: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default CameraWindow;
