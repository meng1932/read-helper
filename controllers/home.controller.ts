import { Request, Response } from "express";

export const welcome = (_req: Request, res: Response): Response => {
  return res.json({ message: "Welcome to Books To Notion application." });
}