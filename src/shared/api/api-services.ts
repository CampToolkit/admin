import { axiosConfig } from "@/shared/api/axios-config.ts";

export const CampApi = {
  getAll: async () => {
    return axiosConfig.get("/camp");
  },
};
