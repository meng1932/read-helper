import axios from "axios";
import { ILibbyHighlight, ILibbyReadingNotes } from "../types/libby";
import { NotionBlock, INotionRichTextObject, NOTION_BLOCK_TYPE, NOTION_COLORS } from "../types/notion";
import NotionService from "./notion.service";

export default class LibbyService {
  private notionService: NotionService
  constructor() {
    this.notionService = new NotionService()
  }

  toQuoteBlock(highlight: ILibbyHighlight): NotionBlock {
    const richTextObject = new INotionRichTextObject()
    richTextObject.text = {
      content: highlight.quote || " ", //" " for audio book.
      link: null
    }
    const block: NotionBlock = {
      type: NOTION_BLOCK_TYPE.QUOTE,
      quote: { rich_text: [richTextObject] }
    }
    return block
  }

  toTimeChapterBlock(highlight: ILibbyHighlight): NotionBlock {
    const richTextObject = new INotionRichTextObject()
    const date = new Date(highlight.timestamp)
    const timeChapterString = date.toLocaleDateString(undefined, {
      weekday: "short",
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) + " " + date.toLocaleTimeString() + " " + highlight.chapter || ""


    richTextObject.text = {
      content: timeChapterString,
      link: null
    }
    richTextObject.annotations.italic = true
    richTextObject.annotations.color = 'gray'
    const block: NotionBlock = {
      type: NOTION_BLOCK_TYPE.PARAGRAPH,
      paragraph: {
        rich_text: [richTextObject]
      }
    }
    return block
  }

  toNoteBlock(highlight: ILibbyHighlight): NotionBlock {
    const richTextObject = new INotionRichTextObject
    richTextObject.text.content = `💡${highlight.note}`
    richTextObject.annotations.color = 'gray_background'

    const block: NotionBlock = {
      type: NOTION_BLOCK_TYPE.PARAGRAPH,
      paragraph: {
        rich_text: [richTextObject]
      }
    }
    return block
  }

  libbyJsonToNotionCommentBlocks = (libbyJson: ILibbyReadingNotes, options?: { includeComments: boolean, includeProfilePicture: boolean, includeRating: boolean }): NotionBlock[] => {
    const blocks: NotionBlock[] = []
    if (libbyJson.highlights?.length) {
      libbyJson.highlights.reverse().forEach((highlight: ILibbyHighlight) => {
        //per quote there are 4 blocks, quote + time/chapter + note + blank block
        blocks.push(this.toQuoteBlock(highlight))
        blocks.push(this.toTimeChapterBlock(highlight))
        if (highlight.note?.length) {
          blocks.push(this.toNoteBlock(highlight))
        }
        //Divider block
        blocks.push(this.notionService.createDividerBlock())
      })
    }
    return blocks
  }

  getLibbyReadingJounal = async (libbyUserId: string, LibbyReadingJourneyId: string) => {
    try {
      const libbyUrl = `https://share.libbyapp.com/data/${libbyUserId}/libbyjourney-${LibbyReadingJourneyId}.json`
      const libbyResp = await axios.get(libbyUrl)
      const libbyData = libbyResp.data
      return libbyData as ILibbyReadingNotes
    } catch (error) {
      console.log(error)
      throw error
    }

  }

  toNotionPage = async (libbyNote: ILibbyReadingNotes) => {
    const notionPage = { properties: {} } as any
    // Book titles
    if (libbyNote.readingJourney.title) {
      notionPage.properties.title = [{ text: { content: libbyNote.readingJourney.title.text } }]
    }
    //Book cover
    if (libbyNote.readingJourney.cover.url) {
      notionPage.cover = {
        external: {
          url: libbyNote.readingJourney.cover.url
        },
        type: "external"
      }
    }

    //Notion page content
    notionPage.children = []
    notionPage.children.push(this.notionService.createHeadingBlock(NOTION_BLOCK_TYPE.HEADING_2, "读后感想 Thoughts & Reflection", false, NOTION_COLORS.YELLOW_BACKGROUND))
    notionPage.children.push(this.notionService.createParagrahBlock(" "))

    if (libbyNote.highlights.length) {
      //Book content and comments
      notionPage.children.push(this.notionService.createHeadingBlock(NOTION_BLOCK_TYPE.HEADING_2, "阅读笔记 Comments & Highlights", false, NOTION_COLORS.YELLOW_BACKGROUND))
      notionPage.children.push(...this.libbyJsonToNotionCommentBlocks(libbyNote))
      notionPage.children.push(this.notionService.createParagrahBlock(" "))
    }
    //Book properties on my own
    return notionPage
  }

  //Notion does not allow to create page with properties other than title. we will need to update the notion page after creating it.
  toNotionPageProperties = async (notionPage: any, libbyNote: ILibbyReadingNotes) => {
    console.log(1)
    //ISBN
    notionPage.properties.ISBN.rich_text = [{
      text: {
        content: libbyNote.readingJourney.isbn,
        link: null
      }
    }]
    console.log(2)
    //Publisher
    notionPage.properties.Publisher.multi_select = [{ name: libbyNote.readingJourney.publisher }]
    notionPage.properties.Author.multi_select = [{ name: libbyNote.readingJourney.author }]

    //Author
    /* notionPage.properties.Author = {
      name: "Author",
      "multi_select": [{ name: libbyNote.readingJourney.author }]
    } */
    //

    console.log(3)
    //Reading date, the descending in libby notes
    //notionPage.properties.Date.date = {}
    //notionPage.properties.Date.start = new Date(libbyNote.highlights[libbyNote.highlights.length - 1].timestamp).toISOString()
    //notionPage.properties.Date.end = new Date(libbyNote.highlights[0].timestamp).toISOString()

    console.log(4)
    return notionPage
  }
}