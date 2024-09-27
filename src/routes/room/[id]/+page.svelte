<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { room, supabase, initialPlayers } = data;
	let players = initialPlayers.map((player) => player.user_id);
	onMount(() => {
		const roomChannel = supabase
			.channel(`room:${room.id}`)
			.on(
				'postgres_changes',
				{ schema: 'public', event: 'INSERT', table: 'players', filter: `room_id=eq.${room.id}` },
				(payload) => {
					players = [...players, payload.new.user_id];
				}
			)
			.subscribe();
		return () => {
			roomChannel.unsubscribe();
		};
	});
</script>

<main>
	<p>room id: {room.id}</p>
	<p>players:</p>
	<ul>
		{#each players as player}
			<li>{player}</li>
		{/each}
	</ul>
</main>
