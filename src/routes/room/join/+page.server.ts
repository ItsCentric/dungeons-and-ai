import { joinRoomSchema } from '$lib/schemas';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(joinRoomSchema))
	};
};

export const actions = {
	default: async (event) => {
		const { supabase, user } = event.locals;
		const form = await superValidate(event, zod(joinRoomSchema));
		if (!form.valid) {
			return error(400, 'Invalid form data');
		}
		const { error: joinError } = await supabase
			.from('players')
			.insert({ room_id: form.data.room_id, user_id: user?.id });
		if (joinError) {
			return error(500, joinError.message);
		}
		redirect(303, `/room/${form.data.room_id}`);
	}
} satisfies Actions;
