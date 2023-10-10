<script lang="ts">
  import type { PageData } from "./$types";
  import SettingsForm from "$lib/components/Register_Form/registerForm.svelte";
  export let data: PageData;
</script>
<div class="max-w-xs w-full mx-auto">
  <div class="text-lg md:text-2xl font-medium mt-10 mb-6">Sign Up</div>
<SettingsForm form={data.form} /></div>