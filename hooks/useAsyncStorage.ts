import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOptions } from "@/types";
import { Alert } from "react-native";

/**
 * Hook for getting data from AsyncStorage
 * @param storageKey - The key to retrieve data from AsyncStorage
 */
export const useAsyncStorageGet = <T>(storageKey: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem(storageKey);
      setData(value ? JSON.parse(value) : null);
      setError(null); // Reset error on successful load
    } catch (err) {
      console.error(err);
      setError(`Failed to load data from ${storageKey} storage.`);
    } finally {
      setLoading(false);
    }
  }, [storageKey]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Expose the reload function
  const reload = useCallback(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, reload };
};

/**
 * Hook for updating data in AsyncStorage.
 * Includes fetching the current data, updating it, and saving it back.
 * @param storageKey - The key to update data in AsyncStorage
 */
export const useAsyncStorageUpdate = (options?: IOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (storageKey: string, newData: object) => {
    setLoading(true);
    try {
      const currentData = await AsyncStorage.getItem(storageKey);
      const parsedCurrentData = currentData ? JSON.parse(currentData) : null;
      const updatedData = parsedCurrentData
        ? { ...parsedCurrentData, ...newData }
        : newData;
      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedData));
      if (options?.onSuccess) {
        options.onSuccess(updatedData);
      }
      setError(null);
      Alert.alert("Success", "Settings notion page id saved");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", `Failed to update data in ${storageKey} storage.`);
      setError(`Failed to update data in ${storageKey} storage.`);
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
};
