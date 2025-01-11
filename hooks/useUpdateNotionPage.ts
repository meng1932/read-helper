import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotionBlock } from "@/types/notion";
import axios, { AxiosError } from "axios";

const useNotionUpdate = (options?:object) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError |any| null>(null);
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
        'x-requested-with': 'XMLHttpRequest', // Add this header
      };
      const response = await axios.patch(
        url,
        { children: blocksToAdd },
        { headers }
      )
      setData(response.data);
    } catch (err) {
      console.error('Error:',(error as AxiosError)?.response?.data);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, mutateAsync };
};

export default useNotionUpdate;
