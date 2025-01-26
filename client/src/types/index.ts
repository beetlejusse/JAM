export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageURL: string;
    audioURL: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageURL: string;
    releaseYear: number;
    songs: Song[];
}

export interface Stats{
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
}