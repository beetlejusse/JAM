import { useAuthStore } from "@/stores/useAuthStores"
import DashboardStats from "../adminComponents/DashboardStats"
import Header from "../adminComponents/AdminHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Album, Music } from "lucide-react"
import SongTabContent from "../adminComponents/songComponents/SongTabContent"
import AlbumTabContent from "../adminComponents/albumComponents/AlbumTabContent"
import { useEffect } from "react"
import { useMusicStore } from "@/stores/useMusicStore"


const AdminPage = () => {
  const { isAdmin, isLoaing } = useAuthStore()

  const {fetchAlbums, fetchSong, fetchStats} = useMusicStore()
  useEffect(() => {
    fetchAlbums()
    fetchSong()
    fetchStats()
  }, [fetchAlbums, fetchSong, fetchStats])

  if (!isAdmin && !isLoaing) return <div>Unauthorized</div>


  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>

          <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <SongTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumTabContent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage
