import { z } from 'zod';

export const anonymousSignInSchema = z.object({
	username: z
		.string()
		.min(2, 'Username must be at least 2 characters long')
		.max(32, 'Username must be at most 32 characters long'),
	'h-captcha-response': z.string()
});

export type AnonymousSignInSchema = z.infer<typeof anonymousSignInSchema>;

export const createRoomSchema = z.object({
	game_id: z.string().uuid().optional()
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;

export const joinRoomSchema = z.object({
	room_id: z.string().uuid()
});

export type JoinRoomSchema = z.infer<typeof joinRoomSchema>;
