<script context="module" lang="ts">

    export type Props = {
      room: string,
      by_in: string,
      small_blind:string,
      players_count: number,
      number: number;
    };
  </script>
  
  <script lang="ts">
    export let room: string;
    export let small_blind: string;
    export let by_in: string;
    export let players_count: number;
    export let number: number;
    import { web3 } from "svelte-web3";
    import { goto } from "$app/navigation";
    import { Contract, ethers } from "ethers";
    import { onMount } from "svelte";
    import { getAccountBalance, getSignerAddress, getSigner } from '../../web3';
    import PokerLogic from '../../contracts/PokerLogic.json';
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    let accountBalance: string | null;
    let signerAddress: string | null;
    let signer: ethers.ContractRunner | null;
    let contract = new ethers.Contract(contractAddress, PokerLogic.abi);
    

  async function joinGame() {
    try {
      const gameId = number;
      const buyIn = 10;
      const cardsHashes = { /* 0xALLAH, 0xAKBAR */ };

      const transaction = await contract.joinGame(gameId, buyIn, cardsHashes);
      await transaction.wait();
      
      console.log('Joined game successfully!');
    } catch (error) {
      console.error('Error joining game:', error);
    }
  }
  async function play() {
    try {
      await joinGame();
      goto('/table/' + room);
      console.log('Play successful!');
    } catch (error) {
      console.error('Error playing:', error);
    }
    
  }
  onMount(async () => {
        accountBalance = await getAccountBalance();
        signerAddress = await getSignerAddress();
        signer = await getSigner();
        contract = new ethers.Contract(contractAddress, PokerLogic.abi, signer);
      });
  </script>
  
  <div class="room-layout">
    <h2>{room}</h2>
    <p>Игроков: {players_count}</p>
    <p>By-in: {by_in} WEI</p>
    <p>Small blind: {small_blind} WEI</p>
    <button on:click={play}>Play</button>
  </div>
  
  <style>
    .room-layout {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 5px;
      flex-grow: 1;
    }
  </style>
  