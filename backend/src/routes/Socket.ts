// backend/routes/game.ts
import { Router, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { randomName } from "template-common";
import { randomUUID } from "node:crypto";
import { optionalAuth } from "../Authentication";

const router = Router();

let connections: Map<string, Socket> = new Map();

/** POST /api/template/createConnection
 *  Creates a new connection
 */
router.post(
  "/create",
  optionalAuth,
  async (req: Request, res: Response) => {
    const connectionId  = randomUUID();
    console.log("create: connectionId: ", connectionId);
    res.json({ connectionId: connectionId });
  },
);

/** GET /api/template/getConnection
 *  Retrieves a connection id.
 */
router.get("/get", optionalAuth, async (req: Request, res: Response) => {
  const { connectionId } = req.query;
  if (typeof connectionId !== "string") {
    res.status(400).json({ error: "Invalid connectionId" });
    return;
  }
  const game = connections.get(connectionId);
  if (!game) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  res.json({ connectionId: connectionId });
});

/** Socket.IO event handlers for game events */
export function handleSocketConnection(io: Server, socket: Socket) {
  socket.on(
    "template",
    async ({ data }: { data: string }) => {
      console.log(`template: ${data}`);
      socket.emit("templateResponse");
      }
  );
}

export default router;
