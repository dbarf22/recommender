<script lang="ts">
	import type { Post } from '$lib/types';

	let { data }: { data: any; filter: string } = $props();
	let selectedPost = $state<Post | null>(null);
	let contentModal: HTMLDialogElement | undefined = $state();

	let filter = $state('all');

	function openContentModal(post: Post) {
		selectedPost = post;
		contentModal?.showModal();
	}
</script>

<nav class="navbar justify-between shadow-sm bg-base-200">
	<a class="btn text-xl btn-ghost" href="/">Recommender</a>
	<div class="flex flex-row items-center gap-2">
		<label for="filterMenu">Filters: </label>
		<select id="filterMenu" class="select" bind:value={filter}>
			<option selected value="all">Show all</option>
			<option value="movie">Movies</option>
			<option value="show">TV Shows</option>
			<option value="album">Albums</option>
		</select>
	</div>
</nav>

{#snippet moviePost(post: post)}
	<div class="card card-side h-64 bg-base-200 shadow-sm">
		<figure class="h-full w-1/3 shrink-0 p-4 hover:scale-105 transition-transform flex items-center justify-center">
			<img
					src={post.image_link}
					alt="Movie Poster"
			class="max-h-full max-w-full w-auto h-auto rounded-md shadow-sm"
			/>
		</figure>
		<div class="card-body overflow-hidden">
			<h2 class="card-title line-clamp-2 text-sm lg:text-lg">{post.title}</h2>
			<p class="line-clamp-6 overflow-hidden">{post.description}</p>
			<div class="card-actions justify-end">
				<p class="mt-auto text-xs italic">({post.type})</p>
				<button
						class="btn btn-neutral"
						onclick={() => {
                   openContentModal(post);
                }}>Open</button
				>
			</div>
		</div>
	</div>
{/snippet}
<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
	{#each data.posts as post}
		{#if filter === 'all' || post.type === filter}
				{@render moviePost(post)}
		{/if}
			
	{/each}

	<dialog bind:this={contentModal} class="modal">
		<div class="modal-box max-h-[80vh] max-w-[80vh]">
			{#if selectedPost}
				<div class="flex flex-col gap-4 overflow-scroll">
					<h3 class="text-lg font-bold">Recommendation for {selectedPost.title}</h3>
					<p>{selectedPost.description}</p>
				</div>
			{/if}
			<div class="modal-action">
				<form method="dialog">
					<button class="btn btn-neutral">Close</button>
				</form>
			</div>
		</div>
	</dialog>
</div>
