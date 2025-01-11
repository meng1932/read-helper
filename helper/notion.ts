import { NotionBlock, INotionRichTextObject, NOTION_BLOCK_TYPE } from "@/types/notion"

export const toQuoteBlock = (quoteContent: string): NotionBlock => {
  const richTextObject = new INotionRichTextObject()
  richTextObject.text = {
    content: quoteContent || " ", //" " for audio book.
    link: null
  }
  const block: NotionBlock = {
    type: NOTION_BLOCK_TYPE.QUOTE,
    quote: { rich_text: [richTextObject] }
  }
  return block
}

export const toTimeChapterBlock = (chapterName?: string): NotionBlock => {
  const richTextObject = new INotionRichTextObject()
  const date = new Date()
  const timeChapterString = date.toLocaleDateString(undefined, {
    weekday: "short",
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) + " " + date.toLocaleTimeString() + " " + chapterName || ""


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

export const toNoteBlock = (comment: string): NotionBlock => {
  const richTextObject = new INotionRichTextObject
  richTextObject.text.content = `💡${comment}`
  richTextObject.annotations.color = 'gray_background'

  const block: NotionBlock = {
    type: NOTION_BLOCK_TYPE.PARAGRAPH,
    paragraph: {
      rich_text: [richTextObject]
    }
  }
  return block
}

export const toDividerBlock = (): NotionBlock => {
  const block: NotionBlock = {
    type: NOTION_BLOCK_TYPE.DIVIDER,
    divider: {}
  }
  return block
}