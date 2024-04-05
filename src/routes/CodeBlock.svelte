<script>
	import { onMount } from 'svelte';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import javascript from 'svelte-highlight/languages/javascript';

	export let code;
	export let highlightedLines = [];

	let codeString;
	onMount(async () => {
		codeString = (await import(`$lib/code-blocks/${code}.js?raw`)).default;
	});
</script>

<div class="codeblock">
	{#if codeString}
		<Highlight language={javascript} code={codeString} let:highlighted>
			<LineNumbers {highlighted} {highlightedLines} --highlighted-background="#ebffaa" />
		</Highlight>
	{/if}
</div>

<style>
	.codeblock {
		border-radius: 6px;
		overflow: hidden;
	}
</style>
