import { Request, Response } from "express";
import NotionService from "../services/notion.service";
import LibbyService from "../services/libby.service";
import { NOTION_PAGE_TYPE } from "../constants/notion.constants";
import { NOTION_COLORS } from "../types/notion";


export default class LibbyController {
  private notionService: NotionService
  private libbyService: LibbyService
  constructor() {
    this.notionService = new NotionService()
    this.libbyService = new LibbyService()
  }

  createPageFromLibby = async (req: Request, res: Response) => {
    try {
      const { notionParentPageId, libbyUserId, libbyReadingJourneyId } = req.params
      //Get info from libby
      const libbyData = await this.libbyService.getLibbyReadingJounal(libbyUserId, libbyReadingJourneyId)
      //Parsing for creating page
      const pageTobeCreated = await this.libbyService.toNotionPage(libbyData)
      console.log(pageTobeCreated.children)
      //Create page
      const notionPage = await this.notionService.createPage(notionParentPageId, NOTION_PAGE_TYPE.DATABASE, pageTobeCreated)


      console.log(notionPage)
      const contentTobeUpdated = await this.libbyService.toNotionPageProperties(notionPage, libbyData)
      //console.log(5, contentTobeUpdated.properties.Date.date)
      //const updatedPage = await this.notionService.updatePagePropertiesById(contentTobeUpdated)
      res.status(201).json({
        message: "create OK",
        reqBody: notionPage
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
        err
      });
    }
  }

  createDBFromLibby = async (req: Request, res: Response) => {
    try {
      const { parentPageId } = req.body
      const db = await this.notionService.createNotionBookShelf(parentPageId)
      res.status(201).json({
        message: "create OK",
        reqBody: db
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
        err
      });
    }
  }

  updatePageFromLibby = async (req: Request, res: Response) => {
    try {
      const { notionPageId, libbyUserId, libbyReadingJourneyId } = req.params;
      //const { include } = req.query;
      const libbyData = await this.libbyService.getLibbyReadingJounal(libbyUserId, libbyReadingJourneyId)
      const contentTobeUpdated = this.libbyService.libbyJsonToNotionCommentBlocks(libbyData as any, { includeComments: true, includeProfilePicture: true, includeRating: true })
      await this.notionService.updatePageContentById(notionPageId, contentTobeUpdated)
      res.status(200).json({
        message: "update OK",
        notionPageId
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
        err
      });
    }
  }
}