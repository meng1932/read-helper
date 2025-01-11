import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotionBlock } from "@/types/notion";
import axios from "axios";

const useNotionUpdate = (options?:object) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const mutateAsync = async (pageId: string, blocksToAdd: NotionBlock[]) => {
    const storedApiKey = await AsyncStorage.getItem("NOTION_API_KEY");
    if (!storedApiKey) {
      setError("API key is missing.");
      return;
    }

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
    };

    try {
      console.log("blocksToAdd", blocksToAdd);
      const response = await axios.patch(
        url,
        { children: blocksToAdd },
        { headers }
      );
      //if(options?.onSuccess){}

      setData(response.data);
    } catch (err) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, mutateAsync };
};

export default useNotionUpdate;
