import { tmdbSearch} from '$lib/server/tmdb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');

	if (!query) {return new Response("No query given.")}

	const result = await tmdbSearch(query);

	if (!result) {
		return json([], {status: 500});
	} else {

		return json(result, {status: 201});
	}

};