import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { itunesSearch } from '$lib/server/itunes';
import { lastfmSearch } from '$lib/server/lastfm';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');

	if (!query) {
		return new Response('No query given.');
	}

	const result: any = await itunesSearch(query);

	if (!result) {
		return json([], { status: 500 });
	} else {
		return json(result, { status: 201 });
	}
};
