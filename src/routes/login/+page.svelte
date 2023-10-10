<script lang="ts">
import { Button } from '$lib/components/ui/button';
import { Label } from '$lib/components/ui/label';
import { Input } from '$lib/components/ui/input';
</script>
<div class="h-screen grid place-content-center">
	<div class="bg-muted shadow-lg p-12">
		<form method="POST" class="flex flex-col gap-3">
			<hgroup>
				
				<h3 class="font-medium text-lg">Welcome back!</h3>
			</hgroup>
			<Label for="username">Username</Label>
			<Input type="text" id="username" name="username" required />
			<label for="password">Password</label>
			<Input type="password" id="password" name="password" required />
		
			<Button type="submit">Login</Button>
		</form>
		<p class="mt-3">Don't have an account? <a href="/register">Register</a></p>
		</div>
</div>
