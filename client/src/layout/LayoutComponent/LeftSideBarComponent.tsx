import { PlaylistSkeleton } from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const LeftSideBarComponent = () => {
  //fetching hardcoded data from database using zustand
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    //fetch
    console.log("Left side bar component mounted, fetchingalbums.....")
    fetchAlbums();
  }, [fetchAlbums]);

  console.log({ albums });
  return (
    <div className="flex flex-col h-full gap-2">
      {/* navigation Menu */}

      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Message</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* fetch playlists */}

      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)] ">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : albums.length > 0 ? (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageURL || "default-placeholder.jpg"}
                    alt="playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div>No albums available</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
