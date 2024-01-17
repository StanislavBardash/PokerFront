// web3.ts

import { ethers } from 'ethers';

let provider: ethers.BrowserProvider | null = null;

if (typeof window !== 'undefined' && window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
} else {
  console.error('MetaMask not detected. Please install MetaMask extension.');
}

export async function getAccountBalance(): Promise<string | null> {
  if (!provider) return null;

  try {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    // Convert balance from wei to ether
    const balanceInEther = ethers.formatEther(balance);
    return balanceInEther;
  } catch (error) {
    console.error('Error getting account balance:', error);
    return null;
  }
}

export async function getSignerAddress(): Promise<string | null> {
  if (!provider) return null;

  try {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.error('Error getting signer address:', error);
    return null;
  }
}

export async function getSigner(): Promise<ethers.ContractRunner | null> {
  if (!provider) return null;

  try {
    const signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error('Error getting signer address:', error);
    return null;
  }
}