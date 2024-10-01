<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1 class="text-2xl font-bold">Welcome to Dungeons and AI!</h1>
	<Button on:click={() => goto('/room/create')} disabled={!data.session}>Create Room</Button>
	<Button on:click={() => goto('/room/join')} disabled={!data.session}>Join Room</Button>
</main>
