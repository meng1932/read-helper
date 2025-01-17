import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export const compressImage = async (
  uri: string,
  sizeLimitMB: number = 1, // Default size limit is 1 MB
  initialCompression: number = 0.9, // Start compression level
  compressionStep: number = 0.1 // Reduce compression level in steps
): Promise<string | null> => {
  try {
    let compression = initialCompression;
    let compressedUri = uri;

    while (true) {
      // Compress the image
      const manipResult = await ImageManipulator.manipulateAsync(
        compressedUri,
        [],
        {
          compress: compression,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      // Get file size
      const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
      const fileSizeInMB = fileInfo.size / (1024 * 1024);

      console.log(`Compressed Size: ${fileSizeInMB.toFixed(2)} MB`);

      // If the file size is within the limit, stop
      if (fileSizeInMB <= sizeLimitMB) {
        console.log("Compression complete. Final size is within the limit.");
        return manipResult.uri;
      }

      // If compression cannot be further reduced, stop
      if (compression <= compressionStep) {
        console.log("Cannot compress further without losing quality.");
        return manipResult.uri;
      }

      // Reduce compression factor for the next iteration
      compression -= compressionStep;
      compressedUri = manipResult.uri;
    }
  } catch (error) {
    console.error("Error compressing image:", error);
    return null;
  }
};
