import { json } from '@sveltejs/kit';
import { makePost } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { title, description, image_link, type } = await request.json();
        const result = await makePost(title, description, image_link, type);
        return json({ message: 'Post created successfully' }, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Failed to create post' }, { status: 500 });
	}
};
