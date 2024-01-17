
<script lang="ts">
	import RoomLayout from './RoomLayout.svelte';
	import { count1, count2, count3 } from '../../stores';

	let currentRoom: string = '';
  

	const switchRoom = (room: string): void => {
	  currentRoom = room;
	};
  </script>
  
  <main>

	<header>
	  <h1>Online Poker</h1>
	</header>
  

	<nav>
	  <ul>
		<li on:click={() => switchRoom('room1')}>Room 1</li>
		<li on:click={() => switchRoom('room2')}>Room 2</li>
		<li on:click={() => switchRoom('room3')}>Room 3</li>
	  </ul>
	</nav>

	<section>
	  {#if currentRoom === 'room1'}
		<RoomLayout room="Room 1" min_bet=0.000001 players_count={$count1} number={1} />
	  {/if}
	  {#if currentRoom === 'room2'}
		<RoomLayout room="Room 2" min_bet=0.00001 players_count={$count2} number={2}/>
	  {/if}
	  {#if currentRoom === 'room3'}
		<RoomLayout room="Room 3" min_bet=0.001 players_count={$count3} number={3}/>
	  {/if}
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
  