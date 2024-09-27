<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_HCAPTCHA_SITEKEY } from '$env/static/public';
	import { superForm } from 'sveltekit-superforms';
	import { anonymousSignInSchema } from '$lib/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from './$types';

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

	export let data: PageData;
	const form = superForm(data.form, {
		validators: zodClient(anonymousSignInSchema)
	});
	const { form: formData, enhance } = form;
</script>

<main class="container mx-auto mt-8 flex flex-col">
	<h1 class="text-2xl font-bold">Sign in</h1>
	<form action="?/anon" method="post" use:enhance>
		<Form.Field {form} name="username" class="max-w-sm">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input {...attrs} bind:value={$formData.username} />
			</Form.Control>
		</Form.Field>
		<div id="hcaptcha-container" data-theme="dark" class="mb-4 mt-2"></div>
		<Form.Button type="submit">Anonymous Sign in</Form.Button>
	</form>
</main>
