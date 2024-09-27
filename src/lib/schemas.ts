import { z } from 'zod';

export const anonymousSignInSchema = z.object({
	username: z
		.string()
		.min(2, 'Username must be at least 2 characters long')
		.max(32, 'Username must be at most 32 characters long'),
	'h-captcha-response': z.string()
});

export type AnonymousSignInSchema = z.infer<typeof anonymousSignInSchema>;
