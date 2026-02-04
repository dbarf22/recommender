import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

type MediaType = 'movie' | 'show' | 'book' | 'album';

type Recommendation = {
	id: number;
	title: string;
	description: string;
	image_link: string;
	type: MediaType;
};

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase.from('posts').select<'posts', Recommendation>();
	console.log("Done with await")
	if (error) {
		console.error('Error loading movies:', error.message);
		return { posts: [] };
	}
	return {
		posts: data ?? []
	};
};