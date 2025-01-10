//making a queue function and a queue state 
import { create } from "zustand"
import { Song } from "@/types"

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currIdx: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currIdx: -1,

    initializeQueue: (songs: Song[]) => {
        set({ queue: songs, currentSong: get().currentSong || songs[0], currIdx: get().currIdx === -1 ? 0 : get().currIdx })
    },

    playAlbum: (songs: Song[], startIndex=0) => {
        if(songs.length === 0) return;
        const song = songs[startIndex];
        set({
            queue: songs,
            currentSong: song,
            currIdx: startIndex,
            isPlaying: true
        });
    },

    setCurrSong: (song: Song | null) => {
        if(!song) return;
        const songIdx = get().queue.findIndex(s => s._id === song._id)
        set({
            currentSong: song,
            isPlaying: true,
            currIdx: songIdx !== -1 ? songIdx: get().currIdx
        })
    },

    togglePlay: () => {
        const willStartPlay = !get().isPlaying;

        //just negate the state.e
        set({
            isPlaying: willStartPlay
        }) 
    },
    playNext: () => {
        const {currIdx, queue} = get()
        const nextIdx = currIdx + 1;

        //if there is next song to play it then we will play it
        if(nextIdx < queue.length){
            const nextSong = queue[nextIdx]
            set({
                currentSong: nextSong,
                currIdx: nextIdx,
                isPlaying: true
            })
        } else{
            set({
              isPlaying: false  
            })
        }
    },

    playPrev: () => {
        const {currIdx, queue} = get()
        const prevIdx = currIdx - 1;

        if(prevIdx >= 0){
            const prevSong = queue[prevIdx];
            set({
                currentSong: prevSong,
                currIdx: prevIdx,
                isPlaying: true
            })
        } else{
            //no prev song
            set({
                isPlaying: false
            })
        }
    },
}))