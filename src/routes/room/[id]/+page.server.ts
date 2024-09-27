import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { supabase } = locals;
	const { data: room, error: roomError } = await supabase
		.from('rooms')
		.select('*')
		.eq('id', params.id)
		.single();
	if (roomError) {
		return error(500, roomError.message);
	}
	const { data: initialPlayers, error: initialPlayersError } = await supabase
		.from('players')
		.select('user_id')
		.eq('room_id', params.id);
	if (initialPlayersError) {
		return error(500, initialPlayersError.message);
	}

	return {
		room,
		initialPlayers
	};
};
