<script lang='ts'>

import {fade} from "svelte/transition";
import { Gamedata, gamedata } from "./Storage/gamedata";
import Button from "./Components/Button.svelte";
import SaveController from "./Controllers/SaveController";
import moment from "moment";

const nav = [
    {name: 'Flow', condition: (gd: Gamedata) => true, to: '/'},
    {name: 'Loops', condition: (gd: Gamedata) => gd.loops.completed.length > 0, to: '/loops'},
    {name: 'Database', condition: (gd: Gamedata) => gd.loops.completed.length >= 3, to: '/database'}
];

let renderable = [];
$:$gamedata,(()=>renderable = nav.filter(n => n.condition($gamedata)))()

</script>
<div class='px-3 my-auto header text-center'>
    {#each renderable as entry}
        <span class='px-1' in:fade><a href={`#`+entry.to}><Button highlight={true}>{entry.name}</Button></a></span>
    {/each}
</div>
<div class='root-view'>
    <slot/>
</div>
<div class='px-0 row my-auto footer text-center'>
    <div class='col-3 my-auto'></div>
    <div class='col-6 my-auto'>
        <span>Data: {$gamedata.data.amount}</span>
    </div>
    <div class='col-3 my-auto'>
        <span>Last saved: {moment($gamedata.meta.lastSavedAt).format('HH:mm:ss')}</span>
        <Button on:click={()=>SaveController.save()}>Save</Button>
    </div>
</div>

<style>
    .header {
        height: 54px;
        padding-top: 10px;
    }

    .footer {
        height: 54px;
        padding-top: 10px;
    }

    .root-view {
        padding-top: 20px;
        border-radius: 20px;
        overflow-y: scroll;
        background-color: #1b202c;
        height: calc(100vh - 108px);
        border: 1px solid black;
        box-sizing: border-box;
    }
</style>