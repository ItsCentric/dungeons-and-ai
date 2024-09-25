<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
	$: ({ session, supabase, user } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<a href="/">Home</a>
<a href="/private">Protected</a>
{#if user}
	<p>id: {user.id}</p>
	<Button variant="destructive" on:click={() => supabase.auth.signOut()}>Sign out</Button>
{:else}
	<Button href="/auth/signin">Sign in</Button>
{/if}
<slot />
