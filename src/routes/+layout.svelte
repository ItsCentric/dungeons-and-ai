<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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

{#if user}
	<p>id: {user.id}</p>
	<button class="text-blue-600 underline" on:click={() => supabase.auth.signOut()}>Sign out</button>
{:else}
	<a href="/auth/signin" class="text-blue-600 underline">Sign in</a>
{/if}
<a href="/" class="text-blue-600 underline">Home</a>
<a href="/private" class="text-red-600 underline">Protected</a>
<slot />
