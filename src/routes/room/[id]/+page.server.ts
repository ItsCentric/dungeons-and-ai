import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { supabase } = locals;
	const { data, error: sbError } = await supabase
		.from('rooms')
		.select('*')
		.eq('id', params.id)
		.single();
	if (sbError) {
		return error(500, sbError.message);
	}

	return {
		room: data
	};
};
