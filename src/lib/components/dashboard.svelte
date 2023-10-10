<script>

</script>
  
  <main class="mx-auto max-w-7xl md:p-10">
    <div class="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
      <h1 class="mb-3 font-bold text-5xl text-gray-900">My Files</h1>
  
      <!-- Replace with your actual UploadButton component -->
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!subscriptionPlan.isSubscribed}>
        Upload
      </button>
    </div>
  
    {#if files && files.length > 0}
      <ul class="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        {#each files as file (file.id)}
          <li
            class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
          >
            <a href={`/dashboard/${file.id}`} class="flex flex-col gap-2">
              <div class="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                <div class="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <div class="flex-1 truncate">
                  <div class="flex items-center space-x-3">
                    <h3 class="truncate text-lg font-medium text-zinc-900">{file.name}</h3>
                  </div>
                </div>
              </div>
            </a>
  
            <div class="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
              <div class="flex items-center gap-2">
                <span class="h-4 w-4 text-zinc-500">+</span>
                {format(new Date(file.createdAt), 'MMM yyyy')}
              </div>
  
              <div class="flex items-center gap-2">
                <span class="h-4 w-4 text-zinc-500">mocked</span>
              </div>
  
              <button
                on:click={() => deleteFile(file.id)}
                class="w-full"
                disabled={currentlyDeletingFile === file.id}
              >
                {#if currentlyDeletingFile === file.id}
                  <div class="h-4 w-4 animate-spin">
                    <!-- Add your loader/spinner here -->
                  </div>
                {:else}
                  <span class="h-4 w-4 text-zinc-500">Trash</span>
                {/if}
              </button>
            </div>
          </li>
        {/each}
      </ul>
    {:else if isLoading}
      <!-- Loading skeleton, replace with your loading UI -->
      <div class="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        {#each [1, 2, 3] as skeleton (skeleton)}
          <div class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow animate-pulse">
            <!-- Add your skeleton loading content here -->
          </div>
        {/each}
      </div>
    {:else}
      <div class="mt-16 flex flex-col items-center gap-2">
        <span class="h-8 w-8 text-zinc-800">Ghost</span>
        <h3 class="font-semibold text-xl">Pretty empty around here</h3>
        <p>Let's upload your first PDF.</p>
      </div>
    {/if}
  </main>
  