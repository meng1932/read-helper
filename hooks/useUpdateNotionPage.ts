import { useState } from 'react';
import { Client } from '@notionhq/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUpdateNotionPageContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePageContentById = async (pageId: string, content: any) => {
    /**
     * @param pageId unique ID in Notion,
     * this page or the parent page should be connected to this APP.
     * @param content content to append to the page.
     */
    setLoading(true);
    setError(null);

    try {
      const storedNotionApiKey = await AsyncStorage.getItem('NOTION_API_KEY');
      const notion = new Client({ auth: storedNotionApiKey || "" });
      await notion.blocks.children.append({
        block_id: pageId,
        children: content,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update page content');
    } finally {
      setLoading(false);
    }
  };

  return { updatePageContentById, loading, error };
};
