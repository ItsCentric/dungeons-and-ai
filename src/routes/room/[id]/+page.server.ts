import { error, redirect, type Actions } from '@sveltejs/kit';
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
	const { data: roomPlayersData, error: roomPlayersError } = await supabase
		.from('players')
		.select('users (id, username)')
		.eq('room_id', params.id);
	if (roomPlayersError) {
		return error(500, roomPlayersError.message);
	}
	const roomPlayers = roomPlayersData.map(
		({ users }) => users as unknown as { id: string; username: string }
	);

	return {
		room,
		roomPlayers
	};
};

export const actions = {
	leave: async ({ params, locals }) => {
		const { supabase, user } = locals;
		const { error: leaveError } = await supabase
			.from('players')
			.delete()
			.eq('room_id', params.id)
			.eq('user_id', user?.id);
		if (leaveError) {
			return error(500, leaveError.message);
		}
		return redirect(303, '/');
	}
} satisfies Actions;
