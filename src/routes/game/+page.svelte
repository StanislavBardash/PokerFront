<script lang="ts">
	import RoomLayout from './RoomLayout.svelte';
	import { counter, dict, addKeyWithValue, room_names, addRoomNameWithValue, information, addInformationWithValue } from '../../stores';
	import { Contract, ethers } from "ethers";
	import { onMount } from "svelte";
	import { getAccountBalance, getSignerAddress, getSigner } from '../../web3';
	import PokerLogic from '../../contracts/PokerLogic.json';
  
	const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	let accountBalance: string | null;
	let signerAddress: string | null;
	let signer: ethers.ContractRunner | null;
	let contract = new ethers.Contract(contractAddress, PokerLogic.abi);
	let inputText = '';
	let small_blind = '';
	let by_in = '';
	let selectedRoom: number | null = null;
  
	const switchRoom = async (room: number): Promise<void> => {
		console.log(room);
		
    selectedRoom = room;
    // Add your asynchronous logic here, if needed
  };
  

  
	function handleInputByIn(event: InputEvent) {
	  // Remove non-numeric characters from the input
	  by_in = (event.target as HTMLInputElement).value.replace(/[^0-9.]/g, '');
	}
  
	function handleInputBlind(event: InputEvent) {
	  small_blind = (event.target as HTMLInputElement).value.replace(/[^0-9.]/g, '');
	}
  
	async function createGameContract(): Promise<boolean> {
  try {
    const buyInAmount = parseInt(by_in);
    const smallBlind = parseInt(small_blind);
    counter.update((n) => n + 1);
    const transaction = await contract.createGame(buyInAmount, smallBlind);
    await transaction.wait();

    console.log('Game created successfully!');
    return true; // Transaction succeeded
  } catch (error) {
    console.error('Error creating game:', error);
    return false; // Transaction failed
  }
}

async function createGame() {
  console.log(`Entered text: ${inputText}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const transactionResult = await createGameContract();

  if (transactionResult) {
    addKeyWithValue($counter, []);
    addRoomNameWithValue($counter, inputText);
    addInformationWithValue($counter, [inputText, by_in, small_blind]);
    console.log($dict);
    console.log($room_names);
    console.log(`Game created: ${inputText}`);
  } else {
    console.log('Transaction failed. Handle it accordingly.');
  }
}
  
	onMount(async () => {
	  accountBalance = await getAccountBalance();
	  signerAddress = await getSignerAddress();
	  signer = await getSigner();
	  contract = new ethers.Contract(contractAddress, PokerLogic.abi, signer);
	});
  </script>
  
  <main>
	<header>
	  <h1>Online Poker</h1>
	</header>
	<label for="textInput">Name of the table:</label>
	<input type="text" id="textInput" bind:value={inputText} />
  
	<label for="Byin">By-in, WEI:</label>
	<input type="text" id="Byin" bind:value={by_in} on:input={handleInputByIn} />
  
  
	<label for="Smallblind">Small blind, WEI:</label>
	<input type="text" id="Smallblind" bind:value={small_blind} on:input={handleInputBlind} />
  
	<button on:click={createGame}>Create a game</button>
	<nav>
	  <ul>
		{#each Object.entries($dict) as [key, value]}
		  <li on:click={() => switchRoom(parseInt(key))}>{$room_names[parseInt(key)]}</li>
		{/each}
	  </ul>
	</nav>
  
	<section>
	  {#each Object.entries($dict) as [key, value]}
		{#if selectedRoom == parseInt(key)}
		  <RoomLayout room={$information[parseInt(key)][0]} small_blind={$information[parseInt(key)][2]} by_in={$information[parseInt(key)][1]} players_count={$dict[parseInt(key)].length} number={parseInt(key)} />
		{/if}
	  {/each}
	</section>
  </main>
  
  <style>
	main {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 20px;
	}
  
	header {
	  text-align: center;
	  margin-bottom: 20px;
	}
  
	nav ul {
	  list-style: none;
	  display: flex;
	  padding: 0;
	  margin: 0;
	}
  
	nav li {
	  cursor: pointer;
	  padding: 10px;
	  margin: 5px;
	  background-color: #eee;
	  border-radius: 5px;
	}
  
	section {
	  display: flex;
	  gap: 20px;
	}
  </style>
  