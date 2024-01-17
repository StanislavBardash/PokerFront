<script>
    import { web3 } from 'svelte-web3';
	import Header from '../Header.svelte';
	import { onMount } from "svelte";
	import { redirect } from '@sveltejs/kit';
	
</script>

<div class="app">
	<!-- <Header /> -->

	<main>
		<slot />
	</main>
	<!-- <button on:click={connectToMetamask} disabled={!isMetamaskInstalled}>
		{isMetamaskInstalled ? "Connect to Metamask" : "Metamask Not Installed"}
		</button> -->
</div>


