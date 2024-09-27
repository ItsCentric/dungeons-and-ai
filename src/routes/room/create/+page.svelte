<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createRoomSchema } from '$lib/schemas';

	export let data: PageData;
	const form = superForm(data.form, {
		validators: zodClient(createRoomSchema)
	});
	const { form: formData, enhance } = form;
</script>

<main>
	<h1 class="text-2xl font-bold">Create a Room</h1>
	<form method="post" use:enhance>
		<p>No options, yet...</p>
		<Form.Button type="submit">Create</Form.Button>
	</form>
</main>
