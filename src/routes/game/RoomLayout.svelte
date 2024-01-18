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
    import {dict, addKeyWithValue} from '../../stores'
    import {rankCodes, suitCodes, stringifyCardCode} from '../../hand-code'
    import { goto } from "$app/navigation";
    import { Contract, ethers } from "ethers";
    import { onMount } from "svelte";
    import { getAccountBalance, getSignerAddress, getSigner } from '../../web3';
    import PokerLogic from '../../contracts/PokerLogic.json';
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    let accountBalance: string | null;
    let signerAddress: string;
    let signer: ethers.ContractRunner | null;
    let contract = new ethers.Contract(contractAddress, PokerLogic.abi);


    let salt_my_card_code1 = '';
    let salt_enemy_card_code1 = '';
    let salt_my_card_code2 = '';
    let salt_enemy_card_code2 = '';


    let my_card_code1 = 0;
    let enemy_card_code1 = 0;
    let my_card_code2 = 0;
    let enemy_card_code2 = 0;
    function generateRandomCardCode(): number {
      const randomRankIndex = Math.floor(Math.random() * Object.keys(rankCodes).length);
      const randomSuitIndex = Math.floor(Math.random() * Object.keys(suitCodes).length);

      const randomRank = Object.keys(rankCodes)[randomRankIndex];
      const randomSuit = Object.keys(suitCodes)[randomSuitIndex];

      return rankCodes[randomRank] | suitCodes[randomSuit];
}
    // function logcode(){
    //   let a = keccak256Hash(generateRandomCardCode());
    //   console.log(`final hash is: ${a}`);
      
    // }
    function generateRandomSalt(length: number): string {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let salt = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        salt += charset[randomIndex];
      }
      return salt;
}
    function keccak256Hash(numberToHash: number, salt:string): string {
      console.log(`salt is: ${salt}`);
      
      return ethers.keccak256(ethers.toUtf8Bytes((numberToHash).toString() + salt))
}

  async function joinGame() : Promise<boolean> {
    try {
      const gameId = number;
      const buyIn = parseInt(by_in);

      salt_my_card_code1 = generateRandomSalt(16);
      salt_enemy_card_code1 = generateRandomSalt(16);
      salt_my_card_code2 = generateRandomSalt(16)
      salt_enemy_card_code2 = generateRandomSalt(16)


      my_card_code1 = generateRandomCardCode();
      enemy_card_code1 = generateRandomCardCode();

      my_card_code2 = generateRandomCardCode();
      enemy_card_code2 = generateRandomCardCode();

      const myCard1 = keccak256Hash(my_card_code1, salt_my_card_code1);
      const enemyCard1 = keccak256Hash(enemy_card_code1, salt_enemy_card_code1);
      const myCard2 = keccak256Hash(my_card_code2, salt_my_card_code2);
      const enemyCard2 = keccak256Hash(enemy_card_code2, salt_enemy_card_code2);
      const cardsHashes = [myCard1, enemyCard1, myCard2, enemyCard2];
      console.log(cardsHashes);
      
      const transaction = await contract.joinGame(gameId, buyIn, cardsHashes);
      await transaction.wait();
  
      console.log('Joined game successfully!');
      return true;
    } catch (error) {
      console.error('Error joining game:', error);
      return false;
    }
  }
  async function play() {
      const transactionResult = await joinGame();
      if (transactionResult) {
        goto('/table/' + room);
        let players = $dict[number];
        players.push(signerAddress)
        addKeyWithValue(number, players)
        console.log('Play successful!');
      }
      else{
        console.log('Transaction failed. Handle it accordingly.')
      }
      
    } 
    
  onMount(async () => {
        accountBalance = await getAccountBalance();
        signerAddress = await getSignerAddress() || '';
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
    <!-- <button on:click={logcode}>Lol</button> -->
  </div>
  
  <style>
    .room-layout {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 5px;
      flex-grow: 1;
    }
  </style>
  