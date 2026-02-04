<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
	let searchQuery = $state("")
	let searchResults = $state([])
	let postModal: HTMLDialogElement | undefined = $state();

	async function search() {
		const response = await fetch(`/api/movies?query=${encodeURIComponent(searchQuery)}`)
		if (response.ok) {
			console.log(`/api/movies?query=${encodeURIComponent(searchQuery)}`)
			searchResults = await response.json();
		}
	}
	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>



<nav class="navbar shadow-sm justify-between">
	<a class="btn btn-ghost text-xl" href="/">recommender</a>
	<input type="search" class="input input-primary" placeholder="Search posts" />
</nav>

<div class="fab">
	<button class="btn btn-xl btn-circle btn-primary" onclick={() => {postModal?.showModal()}}>+</button>
</div>

<dialog bind:this={postModal} class="modal">
	<div class="modal-box">
		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-bold">Enter a recommendation</h3>
			<select class="select w-full">
				<option disabled selected>What are you recommending?</option>
				<option>A movie</option>
				<!--<option>An album</option>
				<option>A TV show</option>
				<option>A book</option>-->
			</select>
			<div class="flex flex-row gap-2">
					<input type="text" placeholder="Search a title" class="input w-full" bind:value={searchQuery}>
					{#if !searchQuery}
						<button class="btn btn-disabled" >Search</button>
					{:else}
						<button class="btn" onclick="{ () => {search()} }">Search</button>
					{/if}
			</div>
			
			
			
			
			<textarea class="textarea textarea-bordered w-full" placeholder="Write a recommendation"></textarea>
		</div>
		
		
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn btn-neutral">Cancel</button>
			</form>
			
			<button class="btn btn-primary">Submit</button>
		</div>
	</div>
	
	
</dialog>


{@render children()}
