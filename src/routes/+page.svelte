<svelte:head>
	<title>Scam Project</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<script>
    import { web3 } from 'svelte-web3';
	

    import { goto } from '$app/navigation';


	import { onMount } from "svelte";
	import { redirect } from '@sveltejs/kit';


	let isMetamaskInstalled = false;

	async function checkIfConnected() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts.length > 0;
    } catch (error) {
      console.error('Error checking MetaMask connection:', error);
      return false;
    }
  }
const connectToMetamask = async () => {
try {
// Check if Metamask is installed
if (window.ethereum) {
isMetamaskInstalled = true;

// Request account access
await window.ethereum.enable();
console.log("Connected to Metamask!");
goto('/game');
} else {
console.error("Metamask not detected. Please install Metamask extension.");
}
} catch (error) {
console.error("Error connecting to Metamask:", "kal AHAHA");
}
};

onMount(async () => {
	isMetamaskInstalled = Boolean(window.ethereum);
        const connected = await checkIfConnected();
    if (connected) {
      // Redirect to the /game path
      goto('/game');
    } 
    });
// onMount(() => {
// // Check if Metamask is installed on component mount


// });
</script>
<section>
	<h1>

		Welcome to Scam Empire<br>
		In order to use this app u need to connect to Metamask
	</h1>
	<button on:click={connectToMetamask} disabled={!isMetamaskInstalled}>
		{isMetamaskInstalled ? "Connect to Metamask" : "Metamask Not Installed"}
		</button>
</section>

<style>
	    button {
      padding: 10px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
</style>
