import { types, flow, Instance } from "mobx-state-tree";
import { requestWithAuth } from "../Firebase";

const TemplateModel = types.model("Template", {
    data: types.optional(types.string, ""),
  }).actions((self) => ({
  setData(data: string) {
    self.data = data;
  },
  submit: flow(function* submit() {
    try {
      const payload = {
        data: self.data,
      };
      const response = yield requestWithAuth(
        "PUT",
        `/api/template/put`,
        JSON.stringify(payload),
      );

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      yield response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  // The setActive action calls the /deck/setActive API.
  load: flow(function* load(id: string) {
    try {
      const payload = {
        id: id,
      };
      const response = yield requestWithAuth(
        "POST",
        `/api/api/get`,
        JSON.stringify(payload),
      );
      if (!response.ok) {
        throw new Error("Failed to load");
      }
      yield response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
}));

export type ITemplateModel = Instance<typeof TemplateModel>;

const templateModel = TemplateModel.create();

export default templateModel;
