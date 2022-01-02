<script>

import { gamedata } from "./Storage/gamedata";
import Button from "./Components/Button.svelte";

const nav = [
    {name: 'Flow'},
    {name: 'Loops'},
];



</script>
<div class='px-3 my-auto header text-center'>
    {#each nav as entry}
        <span class='px-1'><Button highlight={true}>{entry.name}</Button></span>
    {/each}
    
</div>
<div class='root-view'>
    <slot/>
</div>

<style>
    .header {
        height: 54px;
        padding-top: 10px;
    }

    .root-view {
        padding-top: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #1b202c;
        height: calc(100vh - 54px);
        border: 1px solid black;
        box-sizing: border-box;
    }
</style>