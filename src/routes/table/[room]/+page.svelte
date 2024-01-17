<script lang="ts">
    import { page } from '$app/stores';
    import PokerTableLayout from '../PokerTableLayout.svelte';
    $: console.log($page.params);
    let room: string = $page.params['room'];
  </script>
  
<main>

	<header>
	  <h1>Texas Holdem</h1>
	</header>
  

	<section>

		<PokerTableLayout room={room}/>

	</section>
  </main>