<script>
	import '$lib/style/main.css';
	import Header from './Header.svelte';
</script>

<Header />
<main>
	<slot />
</main>

<style>
	main {
		margin: 8rem auto;
		max-width: 52rem;
	}
</style>
