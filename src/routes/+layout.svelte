<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
	$: ({ session, supabase, user, userData } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<nav class="flex justify-between">
	<div>
		<a href="/">Home</a>
		<a href="/private">Protected</a>
	</div>
	<div class="flex items-center gap-4">
		{#if user && userData}
			<p>signed in as: {userData.username}</p>
			<Button variant="destructive" on:click={() => supabase.auth.signOut()}>Sign out</Button>
		{:else}
			<Button href="/auth/signin">Sign in</Button>
		{/if}
	</div>
</nav>
<slot />
