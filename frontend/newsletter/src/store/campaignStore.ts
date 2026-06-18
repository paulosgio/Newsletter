import { create } from "zustand";
import type { ICampaignUser } from "../types";
import { api } from "../services/api";

interface ICampaignStore {
    campaigns: ICampaignUser[] | null
    fetchCampaigns: ()=> void
}

export const useCampaignStore = create<ICampaignStore>((set)=> ({
    campaigns: null,
    fetchCampaigns: async () => {
      try {
        console.log("Buscando campanhas...")
        const response = await api.get("/campaigns");
        set({
          campaigns: response.data,
        });
        console.log(response.data);
        
      } catch (error) {
        console.log("Erro ao buscar campanha");
      }
  },
}))