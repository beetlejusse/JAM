import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axios"
import { Album, Song, Stats } from "@/types"
import { create } from "zustand"

interface MusicStoreInterface {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  isSongsLoading: boolean;
  isStatsLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumsById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeforYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchSong: () => Promise<void>;
  fetchStats: () => Promise<void>;
  deleteSong: (id: string) => void;
  deleteAlbums: (id: string) => void
}

//it will take set as first argument
export const useMusicStore = create<MusicStoreInterface>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0
  },
  isSongsLoading: false,
  isStatsLoading: false,

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

  fetchMadeforYouSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get("/songs/made-for-you")
      set({ madeForYouSongs: res.data })
      console.log(res.data)
    } catch (error: any) {
      console.error("Error fetching made-for-you songs: ", error);
      set({ error: error.response?.data?.message || "Failed to fetch made-for-you songs" });
    } finally {
      set({ isLoading: false })
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get("/songs/featuredSong")
      set({ featuredSongs: res.data.songs })
      console.log(res.data)
    } catch (error: any) {
      console.error("Error fetching featured songs: ", error);
      set({ error: error.response?.data?.message || "Failed to fetch featured songs" });
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get("/songs/trending-song")
      set({ trendingSongs: res.data })
      console.log(res.data)
    } catch (error: any) {
      console.error("Error fetching trending-song songs: ", error);
      set({ error: error.response?.data?.message || "Failed to fetch trending-song songs" });
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSong: async () => {
    set({ isSongsLoading: true, error: null })
    try {
      const res = await axiosInstance.get("/songs")
      set({ songs: res.data.songs })
    } catch (error: any) {
      console.error("Error fetching all songs(fetchSong func): ", error);
      set({ error: error.response?.data?.message || "Failed to fetch all songs" });
    }
    finally {
      set({ isSongsLoading: false })
    }
  },

  fetchStats: async () => {
    set({ isStatsLoading: true, error: null })
    try {
      const res = await axiosInstance.get("/stats")
      set({ stats: res.data })
    } catch (error: any) {
      console.error("Error fetching all songs(fetch stats func): ", error);
      set({ error: error.response?.data?.message || "Failed to fetch stats" });
    } finally{
      set({isStatsLoading: false})
    }
  },

  deleteSong: async(id) => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.delete(`/admin/songs/${id}`)
      set(state => ({
        songs: state.songs.filter(song => song._id !== id)
      }))
      toast({
        title: "Song Deleted SuccessFuly"
      })
    } catch (error:any) {
      console.error("Error deleting song: ", error);
      set({ error: error.response?.data?.message || "Failed to delete song" });
      toast({
        title: "Error deleting song",
        variant: "destructive"
      })
    }
  },

  deleteAlbums: async(id) => {
    set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast({
        title: "Album deleted successfully"
      });
		} catch (error: any) {
			toast({
        title: "Failed to delete album: " + error.message,
        variant: "destructive"
      });
		} finally {
			set({ isLoading: false });
		}
  },
}))