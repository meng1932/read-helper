import { Request, Response } from "express";
import NotionService from "../services/notion.service";
import LibbyService from "../services/libby.service";

export default class NotionController {
  private service: NotionService
  private libbyService: LibbyService

  constructor() {
    this.service = new NotionService()
    this.libbyService = new LibbyService()
  }

  createNotionDB = async (req: Request, res: Response) => {
    try {
      const { parentPageId } = req.body
      const db = await this.service.createNotionBookShelf(parentPageId)
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

  updateNotionDB = async (req: Request, res: Response) => {
    try {
      const { parentPageId } = req.body
      const db = await this.service.createNotionBookShelf(parentPageId)
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

  findAll = async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "findAll OK"
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  findOne = async (req: Request, res: Response) => {
    const page = await this.service.getPageOrDbById(req.params.id, req.params.type)
    try {
      res.status(200).json({
        message: "findOne OK",
        page
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  getPageContentById = async (req: Request, res: Response) => {
    return this.service.getPageContentById(req.params.pageId)
  }

  updateFromLibby = async (req: Request, res: Response) => {
    try {
      const { pageId, libbyUserId, LibbyReadingJourneyId } = req.params;
      const { include } = req.query;
      const libbyReadingJournal = await this.libbyService.getLibbyReadingJounal(libbyUserId, LibbyReadingJourneyId)
      const contentTobeUpdated = this.libbyService.libbyJsonToNotionCommentBlocks(libbyReadingJournal, { includeComments: true, includeProfilePicture: true, includeRating: true })

      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: req.body,
        // contentTobeUpdated
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
        err
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "delete OK",
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}