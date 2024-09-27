<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
    const { room } = data;
</script>

<main>
	<p>room id: {room.id}</p>
</main>
