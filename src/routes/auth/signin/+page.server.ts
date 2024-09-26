import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { anonymousSignInSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(anonymousSignInSchema))
	};
};

export const actions = {
	anon: async (event) => {
		const { supabase } = event.locals;
		const form = await superValidate(event, zod(anonymousSignInSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { data, error: anonError } = await supabase.auth.signInAnonymously({
			options: { captchaToken: form.data['h-captcha-response'] }
		});
		if (anonError || !data?.user || !data?.session) {
			console.error(anonError);
			return fail(500, { form });
		}
		const { error: insertError } = await supabase
			.from('users')
			.insert({ id: data.user.id, username: form.data.username });
		if (insertError) {
			console.error(insertError);
			return fail(500, { form });
		}
	}
} satisfies Actions;
