<script lang="ts">
    import { page } from '$app/stores';
    import PokerTableLayout from '../PokerTableLayout.svelte';
    $: console.log($page.params);
    let room: string = $page.params['room'];
  </script>
  
<main>
	<!-- Header -->
	<header>
	  <h1>Texas Holdem</h1>
	</header>
  
	<!-- Room Selector -->
  
	<!-- Main Content -->
	<section>

		<PokerTableLayout room={room}/>

	</section>
  </main>