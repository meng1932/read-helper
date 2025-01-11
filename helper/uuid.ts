export const convertToUuid=(pageId:string)=> {
    // Extract the last 32 characters (the actual ID)
    const id = pageId.match(/[a-f0-9]{32}$/)?.[0];
    if (!id) throw new Error('Invalid page ID format');
  
    // Insert hyphens at the appropriate positions
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
  }
  
export const extractPageId=(url: string): string | null =>{
    // Regular expression to match the last 32-character alphanumeric string before a query (?)
    const match = url.match(/([a-f0-9]{32})(?=\?)/);
    if (match) {
      const rawId = match[1];
      // Format the matched string into a UUID
      return `${rawId.slice(0, 8)}-${rawId.slice(8, 12)}-${rawId.slice(12, 16)}-${rawId.slice(16, 20)}-${rawId.slice(20)}`;
    }
    return null;
  }
