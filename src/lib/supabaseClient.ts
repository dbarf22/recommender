import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

export async function makePost(title: string, description: string, image_link: string, type: string) {
	const { data, error } = await supabase.from('posts').insert({
		title: title,
		description: description,
		image_link: image_link,
		type: type,
	}).select();

	if (error) throw error;
	return data;
}