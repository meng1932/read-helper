declare module 'expo-file-system' {  
    export function getInfoAsync(uri: string): Promise<{  
      uri: string;  
      exists: boolean;  
      isDirectory: boolean;  
      isFile: boolean;  
      lastModified: number;  
      size: number;  
      // Add other properties if needed  
    }>;  
  }