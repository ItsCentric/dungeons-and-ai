<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_HCAPTCHA_SITEKEY } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';

	onMount(() => {
		if (typeof window !== 'undefined') {
			const script = document.createElement('script');
			script.src = 'https://js.hcaptcha.com/1/api.js';
			script.async = true;
			script.defer = true;
			script.onload = () => {
				hcaptcha.render('hcaptcha-container', {
					sitekey: PUBLIC_HCAPTCHA_SITEKEY
				});
			};
			document.body.appendChild(script);
		}
	});
</script>

<main>
	<h1 class="text-2xl font-bold">Sign in</h1>
	<form method="post">
		<div id="hcaptcha-container" data-theme="dark"></div>
		<Button type="submit" formaction="?/anon">Anonymous Sign in</Button>
	</form>
</main>
