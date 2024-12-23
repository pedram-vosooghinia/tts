import { api } from "@/services/api";

const deleteHashtagsService = <T>(data: T) =>
  api.delete("/hashtags/delete", { data });
const addHahstagsService = <T>(data: T) =>
  api.post("/hashtags/add", { data });

export { deleteHashtagsService,addHahstagsService  };
