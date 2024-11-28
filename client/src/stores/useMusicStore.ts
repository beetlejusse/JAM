import { axiosInstance } from "@/lib/axios"
import { Album, Song } from "@/types"
import { create } from "zustand"

interface MusicStoreInterface {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;

    fetchAlbums: () => Promise<void>;
    fetchAlbumsById: (id: string) => Promise<void>;
}

//it will take set as first argument
export const useMusicStore = create<MusicStoreInterface>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log("Fetching albums...");
          const res = await axiosInstance.get("/albums");
    
          // Adjust here based on your API structure
          const albums = Array.isArray(res.data) ? res.data : res.data.albums;
    
          console.log("Albums fetched successfully:", albums);
          set({ albums });
        } catch (error: any) {
          console.error("Error fetching albums:", error);
          set({ error: error.response?.data?.message || "Failed to fetch albums" });
        } finally {
          set({ isLoading: false });
        }
      },
    

    fetchAlbumsById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log(`Fetching album with id: ${id}`);
      const res = await axiosInstance.get(`/albums/${id}`);
      console.log("Album fetched successfully:", res.data);

      // Assuming `res.data` contains the album object directly
      set({ currentAlbum: res.data.album });
    } catch (error: any) {
      console.error("Error fetching album:", error);
      set({ error: error.response?.data?.message || "Failed to fetch album" });
    } finally {
      set({ isLoading: false });
    }
  },
}))