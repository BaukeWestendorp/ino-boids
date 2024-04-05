<script>
	import { onMount } from 'svelte';
	import Highlight from 'svelte-highlight';
	import javascript from 'svelte-highlight/languages/javascript';

	export let code;

	let codeString;
	onMount(async () => {
		codeString = (await import(`$lib/code-blocks/${code}.js?raw`)).default;
	});
</script>

{#if codeString}
	<Highlight language={javascript} code={codeString} />
{/if}
