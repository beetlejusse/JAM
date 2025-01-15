import { axiosInstance } from "@/lib/axios";
import {create }from "zustand"

interface AuthInterface{
    isAdmin: boolean;
    error: string | null;
    isLoaing: boolean;
    
    checkAdminstatus: () => void;
    reset: () => void
}

export const useAuthStore = create<AuthInterface>((set) => ({
    isLoaing: false,
    isAdmin: false,
    error: null,

    checkAdminstatus: async() => {
        set({isLoaing: true, error: null})
        try {
            const res = await axiosInstance.get("/admin/check-Admin")
            set({isAdmin: res.data.admin})
        } catch (error: any) {
            set({isAdmin: false, error: error.response.data.message})
        } finally{
            set({isLoaing: false})
        }
    },

    //updating state to the initial values
    reset: () => {
        set({isAdmin: false, isLoaing: false, error: null})
    },
}))