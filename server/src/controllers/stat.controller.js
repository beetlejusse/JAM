// import { Song } from "../models/song.model.js";
// import { User } from "../models/user.model.js";
// import { Album } from "../models/album.model.js";

// export const getAdminStats = async (req, res, next) => {
//     try {
//         //will return all number of songs
//         // const totalSongs = await Song.countDocuments()
//         // const totalUsers = await User.countDocuments()
//         // const totalAlbums = await Album.countDocuments()

//         const { totalSongs, totalUsers, totalAlbums, uniqueArtists } =
//             await Promise.all([
//                 Song.countDocuments(),
//                 User.countDocuments(),
//                 Album.countDocuments(),

//                 //for unique artists
//                 Song.aggregate([
//                     {
//                         $unionWith: {
//                             coll: "albums",
//                             pipeline: [],
//                         },
//                     },
//                     {
//                         $group: {
//                             _id: "$artist",
//                         },
//                     },
//                     {
//                         $count: "count",
//                     },
//                 ]),

//             ]);

//             return res.status(200).json({
//                 totalAlbums, totalSongs, totalUsers, totalArtists: uniqueArtists[0]?.count || 0,
//             })
//     } catch (error) {
//         console.log("error fetching admin stats", error);
//         next(error);
//     }
// };


import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAdminStats = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),

			Song.aggregate([
				{
					$unionWith: {
						coll: "albums",
						pipeline: [],
					},
				},
				{
					$group: {
						_id: "$artist",
					},
				},
				{
					$count: "count",
				},
			]),
		]);

		res.status(200).json({
			totalAlbums,
			totalSongs,
			totalUsers,
			totalArtists: uniqueArtists[0]?.count || 0,
		});
	} catch (error) {
		next(error);
	}
};