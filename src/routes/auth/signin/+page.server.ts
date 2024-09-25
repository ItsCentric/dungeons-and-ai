import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	anon: async (event) => {
		const { supabase } = event.locals;
		const formData = await event.request.formData();
		const formDataObj = Object.fromEntries(formData);
		const captchaToken = formDataObj['h-captcha-response'].toString();
		const { error } = await supabase.auth.signInAnonymously({ options: { captchaToken } });
		if (error) {
			throw fail(500);
		}
	}
} satisfies Actions;
