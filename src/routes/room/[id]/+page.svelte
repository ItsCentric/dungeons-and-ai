<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import type { RealtimeChannel } from '@supabase/supabase-js';

	export let data: PageData;
	const { room, supabase, roomPlayers, user } = data;
	let players = [...roomPlayers];
	let roomChannel: RealtimeChannel | undefined;

	onMount(() => {
		roomChannel = supabase
			.channel(`room:${room.id}`)
			.on(
				'postgres_changes',
				{ schema: 'public', event: 'INSERT', table: 'players', filter: `room_id=eq.${room.id}` },
				async (payload) => {
					const { new: newPlayer } = payload;
					const { data: newPlayerData, error: newPlayerError } = await supabase
						.from('users')
						.select('id,username')
						.eq('id', newPlayer.user_id)
						.single();
					if (newPlayerError) {
						console.error(newPlayerError);
						return;
					}
					players = [...players, { id: newPlayerData.id, username: newPlayerData.username }];
				}
			)
			.on('broadcast', { event: 'player_leave' }, async ({ payload }) => {
				if (payload.user_id === room.host) {
					console.log('host disconnected');
					goto('/');
					return;
				}
				players = players.filter((player) => player.id !== payload.user_id);
			})
			.subscribe();
		return () => {
			roomChannel?.unsubscribe();
		};
	});
	async function handleLeave() {
		if (user?.id !== room.host) {
			const { error: leaveError } = await supabase
				.from('players')
				.delete()
				.eq('room_id', room.id)
				.eq('user_id', user?.id);
			if (leaveError) {
				console.error(leaveError);
				return;
			}
		} else {
			const { error: deleteRoomError } = await supabase.from('rooms').delete().eq('id', room.id);
			if (deleteRoomError) {
				console.error(deleteRoomError);
				return;
			}
		}
		roomChannel?.send({ type: 'broadcast', event: 'player_leave', payload: { user_id: user?.id } });
		goto('/');
	}
</script>

<main>
	<p>room id: {room.id}</p>
	<p>players:</p>
	<ul>
		{#each players as player}
			<li>{player.username}</li>
		{/each}
	</ul>
	<Button on:click={handleLeave} variant="secondary">Leave</Button>
</main>
