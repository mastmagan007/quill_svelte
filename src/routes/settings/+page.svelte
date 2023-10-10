<script lang="ts">
    import type { PageData } from "./$types";
    import SettingsForm from "../register/settings-form.svelte";
    export let data: PageData;
  </script>
  <div class="w-full px-10 md:px-0 md:w-1/3 mx-auto mt-8">
    <SettingsForm form={data.form} />
  </div>
 