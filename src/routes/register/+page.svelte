<script lang="ts">
  import type { PageData } from "./$types";
  import SettingsForm from "$lib/components/Register_Form/registerForm.svelte";
  export let data: PageData;
</script>
<div class="max-w-xs w-full mx-auto">
<SettingsForm form={data.form} /></div>