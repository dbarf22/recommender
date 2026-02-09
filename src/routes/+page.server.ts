import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import {fail} from "@sveltejs/kit";

type MediaType = 'movie' | 'show' | 'book' | 'album';

type Recommendation = {
	id: number;
	title: string;
	description: string;
	image_link: string;
	type: MediaType;
};

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase.from('posts').select<'posts', Recommendation>().order('id',{ascending: false});
	if (error) {
		console.error('Error loading movies:', error.message);
		return { posts: [] };
	}
	return {
		posts: data ?? []
	};
};

export const actions = {
	createPost: async ({request}) => {
		const formData = await request.formData()

		let title = formData.get('title')
		let description = formData.get('description')
		let image_link = formData.get('image_link')
		let type = formData.get('type') || 'movie'

		if (!title) {
			return fail(400, {error: "Post must include title"})
		}

		if (!description) {
			return fail(400, { error: 'Post must include description' });
		}

		if(!image_link) {
			image_link = "https://placehold.co/500x750"
		}

		const { data, error } = await supabase.from('posts').insert({
			title,
			description,
			image_link,
			type,
		}).select();

		if (error) {
			console.error('Error posting to DB', error);
			return { success:false, error:error.message}
		}

		return { success:true}
	}
} satisfies Actions