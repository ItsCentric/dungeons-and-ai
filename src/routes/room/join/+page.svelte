<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { joinRoomSchema } from '$lib/schemas';
	import { Input } from '$lib/components/ui/input';

	export let data: PageData;
	const form = superForm(data.form, {
		validators: zodClient(joinRoomSchema)
	});
	const { form: formData, enhance } = form;
</script>

<main>
	<h1 class="text-2xl font-bold">Join a Room</h1>
	<form method="post" use:enhance>
		<Form.Field {form} name="room_id" class="max-w-sm">
			<Form.Control let:attrs>
				<Form.Label>Room ID</Form.Label>
				<Input {...attrs} bind:value={$formData.room_id} />
			</Form.Control>
		</Form.Field>
		<Form.Button type="submit">Join</Form.Button>
	</form>
</main>
