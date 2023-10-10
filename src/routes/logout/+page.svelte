<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>