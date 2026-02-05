import { tmdbShowSearch } from '$lib/server/tmdb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');

	if (!query) {
		return new Response('No query given.');
	}

	const result: any = await tmdbShowSearch(query);

	if (!result) {
		return json([], { status: 500 });
	} else {
		return json(result, { status: 201 });
	}
};
