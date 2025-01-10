import { NOTION_PAGE_TYPE } from "../constants/notion.constants";
import { ILibbyReadingNotes } from "./libby";

interface INotionPageParent {
  page_id?: string;
  database_id?: string;
  type: "page_id" | "database_id";
}

interface INotionEmoji {
  type: "emoji",
  emoji?: string
}
interface INotionPageTitle {
  text: { content: string }
}

interface INotionPageProperty {
  title: INotionPageTitle[]
  cover?: {
    external: {
      url: string;
    };
    type?: "external";
  }
}

interface INotionDBProperty {
  id: string
  name: string
  type: 'select' | "rich_text" | "date" | "status" | "title"
  select?: any,
  rich_text?: any,
  date?: any
  status?: any
  title?: any
}

export interface INotionDB {
  properties: {
    Rating: INotionDBProperty
    Publisher: INotionDBProperty
    ISBN: INotionDBProperty
    Source: INotionDBProperty
    Dates: INotionDBProperty
    Author: INotionDBProperty
    Status: INotionDBProperty
    Title: INotionDBProperty
  }
}

export class INotionRichTextObject {
  type: "text" | "mention" | "equation" = "text"
  text: {
    content: string
    link: null | string
  } = {
      content: "",
      link: null
    }
  quote?: INotionRichTextObject
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: "blue"
    | "blue_background"
    | "brown"
    | "brown_background"
    | "default"
    | "gray"
    | "gray_background"
    | "green"
    | "green_background"
    | "orange"
    | "orange_background"
    | "yellow"
    | "green"
    | "pink"
    | "pink_background"
    | "purple"
    | "purple_background"
    | "red"
    | "red_background"
    | "yellow_background"
  } = {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: "default"
    }
  plain_text: string = ""
  href: string | null = null
}

export type NotionBlockType = "quote" | "paragraph"

export enum NOTION_BLOCK_TYPE {
  QUOTE = 'quote',
  PARAGRAPH = "paragraph",
  DIVIDER = 'divider',
  HEADING_1 = 'heading_1',
  HEADING_2 = 'heading_2',
  HEADING_3 = 'heading_3'
}

export enum NOTION_COLORS{
  YELLOW_BACKGROUND='yellow_background'
}

export type NotionBlock = {
  [key in NOTION_BLOCK_TYPE]?: {
    rich_text?: (INotionRichTextObject | INotionEmoji)[];
    color?: string;
    is_toggleable?: boolean
  };
} & {
  type: NOTION_BLOCK_TYPE;
};

export class CreateNotionPageDto {
  constructor() { }

  parent: INotionPageParent = {
    type: "database_id", //default value,
    database_id: process.env.NOTION_PAGE_ID
  }
  icon: INotionEmoji = {
    "type": "emoji",
    "emoji": "📕"
  }
  properties: INotionPageProperty = {
    title: [],
  }
}

