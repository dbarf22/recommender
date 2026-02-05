import { TMDB } from 'tmdb-ts';
import { TMDB_API_KEY } from '$env/static/private';

export const tmdbClient = new TMDB(TMDB_API_KEY);

type searchResults = {
	title: string,
	poster_path: string,
	id: number,
	type: string
}

export async function tmdbSearch(searchTerm: string) {
	try {
		const results = await tmdbClient.search.movies({ query: searchTerm });

		return results.results.map((item:any) => ({
			title: item.title,
			poster_path: item.poster_path,
			id: item.id,
			type: 'movie'
		}))

	} catch (error) {
		if (error) {
			console.error('TMDB Error:', error)
		} else {
			console.error('Unknown error:', error);
		}
	}
}

export async function tmdbShowSearch(searchTerm: string) {
	try {
		const results = await tmdbClient.search.tvShows({ query: searchTerm });
		console.log(results.results);

		return results.results.map((item:any) => ({
			title: item.name,
			poster_path: item.poster_path,
			id: item.id,
			type: 'show'
		}))


	} catch (error) {
		if (error) {
			console.error('TMDB Error:', error)
		} else {
			console.error('Unknown error:', error);
		}
	}
}
