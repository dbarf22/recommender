<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { result, Post } from '$lib/types';
	import { enhance } from '$app/forms';

	/*prop declarations */
	let { children, form } = $props() as {
		form?: any,
		children?: any
	};

	/*State declarations*/
	let searchQuery = $state('');
	let searchResults = $state<result[]>([]);
	let postModal = $state<HTMLDialogElement>();
	let isSubmitting = $state(false);
	let searchController: AbortController | null = null;

	/*Derived declarations*/
	let showSearchResults = $derived(searchResults.length > 0);

	/*Normal variable declarations*/
	let post: Post = $state({
		title: '',
		description: '',
		image_link: '',
		type: 'movie'
	});

	let selectedTitle = '';

	/*Function declarations*/
	async function tmdbSearch() {
		
		if (searchController) {
			searchController.abort();
		}
		
		searchController = new AbortController();
		
		try {const response = await fetch(`/api/movies?query=${encodeURIComponent(searchQuery)}`,
				{ signal: searchController.signal});
			if (response.ok) {
				searchResults = await response.json();
			} } catch (error) {
			if (erorr.name!== 'AbortError') {
				console.error(error);
			}
		}
	}

	function updatePostInformation(result: result, type: string) {
		const url = type === 'movie' ? 'https://image.tmdb.org/t/p/w500' : '';
		post.title = result.title;
		post.image_link = url + result.poster_path;
		searchResults = [];
		searchQuery = result.title;
		selectedTitle = result.title;
	}

	/*Effect declarations*/
	$effect(() => {
		if (selectedTitle === searchQuery) {
			return;
		}
		if (searchQuery.length < 3) {
			searchResults = [];
			return;
		}
		const timer = setTimeout(() => {
			tmdbSearch();
		}, 300);
		return () => clearTimeout(timer);
	});
</script>

{#snippet movieResult(result: result)}
	{@const posterUrl = result.poster_path
		? `https://image.tmdb.org/t/p/w500${result.poster_path}`
		: 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
	<li>
		<button
			type="button"
			class="flex min-w-full cursor-pointer flex-row items-center text-left hover:bg-base-300"
			onclick={() => {
				updatePostInformation(result, 'movie');
			}}
		>
			<img src={posterUrl} loading="lazy" alt={result.title} class="w-16 rounded-md p-2" />
			{result.title}
		</button>
	</li>
{/snippet}

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar justify-between shadow-sm">
	<a class="btn text-xl btn-ghost" href="/">Recommender</a>
	<input type="search" class="input input-primary" placeholder="Search posts" />
</nav>

<div class="fab">
	<button
		class="btn btn-circle btn-xl btn-primary"
		onclick={() => {
			postModal?.showModal();
		}}>+</button
	>
</div>

<dialog bind:this={postModal} class="modal">
	<div class="modal-box">
		<form
			method="POST"
			action="/?/createPost"
			use:enhance={() => {
				isSubmitting = true;

				return async ({ result, update }) => {
					await update();

					if (result.type === 'success') {
						post = {
							title: '',
							description: '',
							image_link: '',
							type: 'movie'
						};
						searchQuery = '';
						selectedTitle = '';
						postModal?.close();
					}
					isSubmitting = false;
				};
			}}
		>
			<div class="flex min-h-[70vh] flex-col gap-4 xl:min-h-[60vh]">
				<h3 class="text-lg font-bold">Enter a recommendation</h3>
				<!--<select class="select w-full">
				<option disabled selected>What are you recommending?</option>
				<option>A movie</option>
				&lt;!&ndash;<option>An album</option>
				<option>A TV show</option>
				<option>A book</option>&ndash;&gt;
			</select>-->

				{#if form?.error}
					<div class="alert alert-error" role="alert">
						{form.error}
					</div>
				{/if}

				<div class="relative">
					<div class="flex flex-row gap-2">
						<input
							type="text"
							placeholder="Search a title"
							class="input w-full"
							bind:value={searchQuery}
						/>
					</div>
					{#if showSearchResults}
						<ul
							class="absolute z-50 m-1 max-h-60 w-full overflow-y-auto
						 rounded-md border bg-base-200 p-2 shadow-lg"
						>
							{#each searchResults as result (result.id)}
								{@render movieResult(result)}
							{/each}
						</ul>
					{/if}
				</div>

				<input type="hidden" name="title" value={post.title} />
				<input type="hidden" name="image_link" value={post.image_link} />
				<input type="hidden" name="type" value={post.type} />

				<textarea
					class="textarea-bordered textarea w-full grow"
					placeholder="Write a recommendation"
					name="description"
					bind:value={post.description}
				></textarea>
			</div>

			<div class="modal-action">
				<!-- if there is a button in form, it will close the modal -->
				<button
					class="btn btn-neutral"
					type="button"
					onclick={() => {
						postModal?.close();
					}}>Cancel</button
				>
				<button disabled={isSubmitting || !post.title || !post.description} class="btn btn-primary" type="submit"
					>{isSubmitting ? 'Submitting' : 'Submit'}</button
				>
			</div>
		</form>
	</div>
</dialog>

{@render children()}
