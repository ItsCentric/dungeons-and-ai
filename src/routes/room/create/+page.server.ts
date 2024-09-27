import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from '../../auth/signin/$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createRoomSchema } from '$lib/schemas';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, user } = locals;
	const { data: gamesData, error: gamesError } = await supabase
		.from('games')
		.select('id')
		.eq('initial_player', user?.id);
	if (gamesError) {
		console.error(gamesError);
		return { form: { valid: false, errors: { games: 'Failed to fetch games' } } };
	}

	return {
		form: await superValidate(zod(createRoomSchema)),
		games: gamesData
	};
};

export const actions = {
	default: async (event) => {
		const { supabase, user } = event.locals;
		const form = await superValidate(event, zod(createRoomSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		let game_id = form.data.game_id;
		if (!game_id) {
			const { data, error } = await supabase
				.from('games')
				.insert({ initial_player: event.locals.user?.id, chat_log: [{ message: 'message' }] })
				.select('id')
				.single();
			if (error) {
				console.error(error);
				return fail(500, { form });
			}
			game_id = data.id;
		}
		const { data, error } = await supabase
			.from('rooms')
			.insert({ game_id, host: user?.id })
			.select('id')
			.single();
		if (error) {
			console.error(error);
			return fail(500, { form });
		}
		redirect(303, `/room/${data.id}`);
	}
} satisfies Actions;
