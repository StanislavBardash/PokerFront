<!-- Header.svelte -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { getAccountBalance, getSignerAddress } from '../web3';
    import { goto } from '$app/navigation';
    let accountBalance: string | null;
    let signerAddress: string | null;
    onMount(async () => {
        
      accountBalance = await getAccountBalance();
      signerAddress = await getSignerAddress();
    });

    async function connectToMetaMask() {
      try {
        // await window.ethereum?.request({ method: 'eth_requestAccounts' });
        accountBalance = await getAccountBalance();
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }
  </script>
  
  <header>
    <h1>My Svelte App</h1>
    <div class="info-container">
        {#if signerAddress !== undefined}
          <p>Connected Signer: {signerAddress}</p>
        {/if}
        {#if accountBalance !== undefined}
          <p>Account Balance: {accountBalance} ETH</p>
        {/if}
      </div>
  </header>
  
  <style>
      header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #333;
    color: #fff;
  }

  h1 {
    margin: 0;
  }

  .info-container {
    display: flex;
    align-items: center;
  }

  p {
    margin: 0 10px;
  }
  

  </style>