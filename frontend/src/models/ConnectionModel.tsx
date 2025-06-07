// GameStore.ts
import {
  types,
  flow,
} from "mobx-state-tree";
import { io, Socket } from "socket.io-client";

import { urlOf } from "../Utilities";
import { requestWithAuth } from "../Firebase";
import { randomName } from "template-common";

export const ConnectionModel = types.model("Connection", {
  id: types.string,
})
.volatile((_) => ({
  socket: null as Socket | null,
}))
.actions((self) => ({
  setConnectionId(id: string) {
    self.id = id;
  },
  connectSocket() {
    self.socket = io(urlOf(""), {
      autoConnect: true,
      auth: {
        id: self.id,
      },
      extraHeaders: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    self.socket.on("templateResponse", () => {
      console.log("Template connection response");
    });
  },
})).actions((self) => ({
  createConnection: flow(function* createConnection() {
    const endpoint = "/api/connection/create";
    try {
      const response = yield requestWithAuth(
        "POST",
        endpoint,
      );
      const data = yield response.json();
      self.id = data.id;
      self.connectSocket();
    } catch (error: any) {
      console.log(error.message);
    }
  }),

  /**
   * Submit the round by sending the current dropzone and hand data to the backend.
   */
  submit: flow(function* submit() {
    try {
      if (!self.socket) {
        throw new Error("Socket not connected");
      }
      self.socket.emit("template", {
        data: randomName(),
      });
    } catch (error: any) {
      console.log("error in submitRound:", error.message);
    }
  }),

  /**
   * Disconnect the socket connection.
   * Typically called when the component unmounts.
   */
  disconnectSocket() {
    if (self.socket) {
      self.socket.disconnect();
      self.socket = null;
    }
  },
}));

const connectionModel = ConnectionModel.create();

export default connectionModel;
