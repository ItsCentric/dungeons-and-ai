import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, fetch }) => {
	const { supabase, user } = locals;

	const { data: isInRoom, error: isInRoomError } = await supabase
		.from('players')
		.select('users (id, username)')
		.eq('room_id', params.id)
		.eq('user_id', user?.id)
		.maybeSingle();
	if (isInRoomError) {
		return error(500, isInRoomError.message);
	}
	if (isInRoom) {
		return redirect(303, `/room/${params.id}`);
	}
	const joinResponse = await fetch(`/api/room/join/${params.id}`, {
		method: 'POST'
	});
	if (!joinResponse.ok) {
		return error(500, 'Failed to join room');
	}
	return redirect(303, `/room/${params.id}`);
};
