import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect, useState } from "react"
import { FeaturedGrid } from "./homeComponents/FeaturedGrid"
import { ScrollArea } from "@/components/ui/scroll-area"
import SectionGrid from "./homeComponents/SectionGrid"
import { usePlayerStore } from "@/stores/usePlayerStore"

const HomePage = () => {
  const { fetchFeaturedSongs, fetchMadeforYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, trendingSongs, featuredSongs } = useMusicStore()
  const { initializeQueue } = usePlayerStore()

  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    let currentGreeting = "Good AfterNoon"

    if (hour < 12) {
      currentGreeting = "Good Morning"
    } else if(hour > 18 && hour <= 24){
      currentGreeting = "Good Evening"
    }

    setGreeting(currentGreeting)
  }, []) 

  useEffect(() => {
    fetchFeaturedSongs()
    fetchMadeforYouSongs()
    fetchTrendingSongs()
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeforYouSongs])

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
      initializeQueue(allSongs)
    }
  }, [initializeQueue, featuredSongs, trendingSongs, madeForYouSongs])

  return (
    <div>
      <TopBar />
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-6'>
            {greeting}
          </h1>
          <FeaturedGrid />
          <div className='space-y-8'>
            <SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default HomePage
