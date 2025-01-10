import { Client } from "@notionhq/client"
import { BOOKSHELF_TEMPLATE_DEV, NOTION_PAGE } from "../constants/notion.constants.dev"
import { NOTION_PAGE_TYPE } from "../constants/notion.constants"
import { INotionRichTextObject, NOTION_BLOCK_TYPE, NOTION_COLORS, NotionBlock } from "../../types/notion"

export default class NotionService {
  notion: Client

  constructor() {
    if (!process.env.NOTION_KEY?.length) {
      throw Error("No authentication key found, please follow the instruction to get notion key")
    }
    this.notion = new Client({ auth: process.env.NOTION_KEY })
  }

  //createProperties: should be a child of property object
  /* @params
  start:string (ISO 8601 date and time)
  end:string (ISO 8601 date and time)
   */
  createDate(start: string, end?: string) {
    return { date: { start, end } }
  }
  /**
   * create blocks
   * **/

  createHeadingBlock(type: NOTION_BLOCK_TYPE, heading: string, toggleable?: boolean, color?: NOTION_COLORS) {
    const richTextObject = new INotionRichTextObject()
    richTextObject.text = {
      content: heading,
      link: null
    }
    const block: NotionBlock = {
      type: type,
      [type]: {
        rich_text: [richTextObject],
        color: color || "default",
        is_toggleable: !!toggleable
      }
    }
    return block
  }

  createDividerBlock() {
    const block: NotionBlock = {
      type: NOTION_BLOCK_TYPE.DIVIDER,
      divider: {}
    }
    return block
  }

  createParagrahBlock(content: string) {
    const richTextObject = new INotionRichTextObject
    richTextObject.text.content = content
    const block: NotionBlock = {
      type: NOTION_BLOCK_TYPE.PARAGRAPH,
      paragraph: {
        rich_text: [richTextObject]
      }
    }
    return block
  }

  // Create bookshelf
  createNotionBookShelf = async (parentPageId: string, bookshelfName?: string) => {
    /**
     * @param parentPageId unique ID in Notion, where the DB should be created under
     * this page should also be connected to this APP.
     */
    const newDB = BOOKSHELF_TEMPLATE_DEV
    newDB.parent.page_id = parentPageId
    if (bookshelfName?.length) {
      newDB.title[0].text.content = bookshelfName
    }
    const newDb = await this.notion.databases.create(newDB as any)
    return newDb
  }

  updateNotionBookShelf = async (parentPageId: string, bookshelfName?: string) => {
    /**
     * @param parentPageId unique ID in Notion, where the DB should be created under
     * this page should also be connected to this APP.
     */
    const newDB = BOOKSHELF_TEMPLATE_DEV
    newDB.parent.page_id = parentPageId
    if (bookshelfName?.length) {
      newDB.title[0].text.content = bookshelfName
    }
    const newDb = await this.notion.databases.create(newDB as any)
    return newDb
  }

  getPageOrDbById = async (id: string, type: string) => {
    if (type === "page") {
      const page = await this.notion.pages.retrieve({ page_id: id })
      return page
    } else if (type === "db") {
      const db = await this.notion.databases.retrieve({ database_id: id })
      return db
    } else {
      throw Error("Type should be 'db' or 'page'.")
    }
  }

  updatePageContentById = async (pageId: string, content: any) => {
    /**
    * @param parentPageId unique ID in Notion,
    * this page or the parent page should be connected to this APP.
    */
    await this.notion.blocks.children.append({ block_id: pageId, children: content })
    return;
  }

  createPage = async (parentId: string, parentType: NOTION_PAGE_TYPE, page: any) => {
    const notionPage = {
      parent: {},
      ...page,
      icon: {
        type: "emoji",
        emoji: "📕"
      },
    }

    //add parent information
    if (parentType === NOTION_PAGE_TYPE.PAGE) {
      notionPage.parent = {
        type: "page_id",
        page_id: parentId
      }
    } else {
      notionPage.parent = {
        type: "database_id",
        database_id: parentId
      }
    }

    const res = await this.notion.pages.create(notionPage)
    return res
  }

  updatePagePropertiesById = async (page: any) => {
    /**
    * @param parentPageId unique ID in Notion,
    * this page or the parent page should be connected to this APP.
    */
    await this.notion.pages.update({ page_id: page.id, ...page })
    return;
  }

  getPageContentById = async (pageId: string) => {
    const content = await this.notion.blocks.children.list({ block_id: pageId })
    return content
  }
}