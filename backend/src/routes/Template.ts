// deckRoutes.ts
import { Router, Request, Response } from "express";
import { strictAuth } from "../Authentication";
import {
  getTemplate,
  updateTemplate,
} from "../models/TemplateStore"; // adjust import paths as needed
import { randomName } from "template-common";
import { randomUUID } from "crypto";

const templateRoutes = Router();

/**
 * GET /api/template/get
 * Sets the active deck for the authenticated user.
 * Expects JSON body: { deckId: string }
 */
templateRoutes.get(
  "/get",
  strictAuth,
  async (req: Request, res: Response) => {
    try {
      res.status(200).json({ message: "random name: " + randomName() });
    } catch (error) {
      console.error("Error setting active deck:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

/**
 * POST /deck/addOrUpdate
 * Inserts or updates a user's deck.
 * Expects JSON body: { deckId: string, deck: string[] }
 */
templateRoutes.put(
  "/put",
  strictAuth,
  async (req: Request, res: Response) => {
    console.log("/api/deck/addOrUpdate");
    try {
      const id = randomUUID();
      const data = req.body.data || randomName();
      const template = await updateTemplate(id, data);
      res.status(200).json(template);
      console.log("/api/template/put success");
    } catch (error) {
      console.error("Error adding or updating template:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default templateRoutes;
