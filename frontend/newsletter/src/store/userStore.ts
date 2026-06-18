import { create } from "zustand";
import type { IUser } from "../types";
import { api } from "../services/api";

interface IUserStore {
    user: IUser | null,
    fetchUser: ()=> void
}

export const useUserStore = create<IUserStore>((set)=> ({
    user: null,
    fetchUser: async ()=> {
        const response = await api.get("/users/me")
        set({user: response.data})
    }
}))

