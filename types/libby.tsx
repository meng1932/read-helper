export interface ILibbyCover {
    contentType: string,
    url: string,
    title: string,
    color: string,
    format: string
  }
  
  export interface ILibbyTitle {
    text: string,
    url: string,
    titleId: string
  }
  
  export interface ILibbyReadingJourney {
    cover: ILibbyCover,
    title: ILibbyTitle,
    author: string,
    publisher: string,
    isbn: string,
    percent: number
  }
  
  export interface ILibbyBookmark {
    timestamp: EpochTimeStamp,
    chapter: string,
    percent: number
  }
  
  export interface ILibbyHighlight {
    timestamp: EpochTimeStamp,
    chapter: string,
    percent: number,
    color: string,
    quote: string,
    note?: string
  }
  
  export interface ILibbyReadingNotes {
    version: number,
    readingJourney: ILibbyReadingJourney,
    bookmarks: ILibbyBookmark[],
    highlights: ILibbyHighlight[]
  }