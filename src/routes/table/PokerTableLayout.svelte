<script context="module" lang="ts">
  export type Props = {
    room: string;
  };
</script>

<script lang="ts">
  export let room: string;
</script>

<div class="poker-table-layout">
  <h2>{room}</h2>

  <!-- Poker table content -->
  <div class="table">
    <div class="players top-player">
      <!-- Placeholder for top player -->
      <div class="player">
        Player 2
      </div>
    </div>

    <div class="cards">
      <!-- Placeholder for community cards at the center -->
      {#each new Array(5) as _, i}
        <div class="card">
          Card {i + 1}
        </div>
      {/each}
    </div>

    <div class="players bottom-player">
      <!-- Placeholder for bottom player -->
      <div class="player">
        Player 1
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background: black; /* Set the background color to black for the entire page */
    margin: 0; /* Remove default body margin */
  }

  .poker-table-layout {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    flex-grow: 1;
    position: relative;
  }

  .table {
    position: relative;
    width: 1280px; /* Set the width of the table */
    height: 720px; /* Set the height of the table */
    margin: auto;
    background: url('/table.jpg') center/cover; /* Adjust the path to your image */
  }

  .players {
    display: flex;
    gap: 10px;
  }

  .top-player {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .bottom-player {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .player {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background: white;
  }

  .cards {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 10px;
  }

  .card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }
</style>