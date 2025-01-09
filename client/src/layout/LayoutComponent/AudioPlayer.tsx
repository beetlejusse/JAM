import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)

  const {currentSong, isPlaying, playNext} = usePlayerStore()

  //for handling play and apuse logic
  useEffect(() => {
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause()
  }, [isPlaying])

  //handle when the song ends
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => {
      playNext()
    }
    audio?.addEventListener("ended", handleEnded)

    return () => audio?.removeEventListener("ended", handleEnded)
  }, [playNext])

  //writing functionality to start and stop resume and play song from where we left previously
  useEffect(() => {
    if(!audioRef.current || !currentSong) return;
    const audio = audioRef.current
    //check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioURL
    if(isSongChange){
      audio.src = currentSong?.audioURL
      //reset the playback position
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioURL;

      if(isPlaying) audio.play()
    }
  },[currentSong, isPlaying])
  return <audio ref={audioRef} />
}

export default AudioPlayer
