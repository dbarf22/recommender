import { LastFMAlbum } from 'lastfm-ts-api';
import { LAST_FM_API_KEY } from '$env/static/private';

const album = new LastFMAlbum(LAST_FM_API_KEY);

export async function lastfmSearch(query:string) {
	const response = await album.search(({album: query}))
	return response
}