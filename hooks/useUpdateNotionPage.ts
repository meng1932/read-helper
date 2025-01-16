import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotionBlock } from "@/types/notion";
import axios, { AxiosError } from "axios";
import { Alert } from "react-native";
import { IOptions } from "@/types";

const useNotionUpdate = (options?: IOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | any | null>(null);
  const [data, setData] = useState<any | null>(null);

  const mutateAsync = async (pageId: string, blocksToAdd: NotionBlock[]) => {
    try {
      const storedApiKey = await AsyncStorage.getItem("NOTION_API_KEY");
      setIsLoading(true);
      setError(null);
      //https://cors-anywhere.herokuapp.com/corsdemo
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const notionApiUrl = `https://api.notion.com/v1/blocks/${pageId}/children`;
      const url = proxyUrl + notionApiUrl;
      const headers: HeadersInit = {
        Authorization: `Bearer ${storedApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        //'Origin': 'your-origin-url', // Replace with your origin URL
        "x-requested-with": "XMLHttpRequest", // Add this header
      };
      const response = await axios.patch(
        url,
        { children: blocksToAdd },
        { headers }
      );
      if (options?.onSuccess) {
        options.onSuccess(response?.data);
      }

      setData(response?.data);
      Alert.alert(
        "Submitted",
        "Congratulations! Your data has been submitted successfully."
      );
    } catch (err: any) {
      Alert.alert("Error", err, err?.response?.data || "An error occurred");
      setError((err as Error).message || "An error occurred");
      console.error(
        "here is the error: ",
        err,
        err?.response?.data || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, mutateAsync };
};

export default useNotionUpdate;
