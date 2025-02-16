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

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
	[x: string]: string;
    _id: string;
    fullName: string;
    clerkId: string;
    imageURL: string;
}