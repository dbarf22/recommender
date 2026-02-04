<script lang="ts">
	import type { Post} from "$lib/types";
	
	let { data } = $props();
	let selectedPost = $state<Post | null>(null);
	let contentModal: HTMLDialogElement | undefined = $state();
	
	function openContentModal(post: Post) {
		selectedPost = post;
		contentModal?.showModal();
	}
</script>


<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
	{#each data.posts as post}
		<div class="card card-side h-64 bg-base-100 shadow-sm">
			<figure class="h-full w-auto shrink-0 p-4">
				<img
					src={post.image_link}
					alt="Movie Poster"
					class="h-full w-full rounded-md object-cover"
				/>
			</figure>
			<div class="card-body overflow-hidden">
				<h2 class="card-title">{post.title}</h2>
				<p class="line-clamp-6 overflow-hidden">{post.description}</p>
				<div class="card-actions justify-end">
					<p class="mt-auto text-xs italic">({post.type})</p>
					<button
						class="btn btn-primary"
						onclick={() => {
							openContentModal(post);
						}}>Open</button
					>
				</div>
			</div>
		</div>
	{/each}

	<dialog bind:this={contentModal} class="modal">
		<div class="modal-box max-w-[80vh] max-h-[80vh]">
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
