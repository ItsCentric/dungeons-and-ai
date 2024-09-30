import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params, locals }) => {
	const { supabase, user } = locals;
	if (!user) {
		return error(401, 'Unauthorized');
	}
	const { error: joinError } = await supabase
		.from('players')
		.insert({ room_id: params.id, user_id: user?.id });
	if (joinError) {
		return error(500, joinError.message);
	}
	return new Response();
};
