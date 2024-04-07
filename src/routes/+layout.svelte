<script>
	import '$lib/style/main.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import 'svelte-highlight/styles/github.css';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		margin: 8rem auto;
		max-width: 52rem;
	}
</style>
