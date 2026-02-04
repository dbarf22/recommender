import { TMDB, TMDBError } from '@lorenzopant/tmdb';
import { TMDB_API_KEY } from '$env/static/private';

export const tmdbClient = new TMDB(TMDB_API_KEY);

export async function tmdbSearch(searchTerm: string) {
	try {
		return await tmdbClient.search.movies({ query: searchTerm });
	} catch (error) {
		if (error instanceof TMDBError) {
			console.error('TMDB Error:', error.message);
			console.error('HTTP Status:', error.http_status_code);
			console.error('TMDB Status Code:', error.tmdb_status_code);
		} else {
			console.error('Unknown error:', error);
		}
	}
}