import { searchItunes } from 'node-itunes-search/dist/mod';


export async function itunesSearch(query: string) {
	const results = await searchItunes({
		term: query,
		limit: '10',
		media: 'music',
		entity: 'album'
	});
	console.log(results);
// 	return results.results;
	return results.results.map((result: any) => ({
		title: result.collectionName + ' - ' + result.artistName,
		id: result.collectionId,
		type: 'album',
		poster_path: result.artworkUrl100?.replace('100x100bb.jpg', '250x250bb.jpg'),
	}));


}


