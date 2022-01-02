<script lang="ts">
    import { onMount } from "svelte";
    import {fade} from "svelte/transition";

    export let current: number = 71;
    export let max: number = 200;
    export let tip: string = 'test';
    export let mute = false;
    let mounted: boolean = false;

    onMount(() => mounted = true);

    $:percent = ((current/max)*100);
    $:displayPercent = percent % 1 !== 0 ? percent.toFixed(2) : percent;
    $:nodes = ~~(percent/5);
</script>

{#if !mute}
<div class='row px-0'>
    <div class='col-6 px-0'>
        {tip}
    </div>
    <div class='col-6 px-0 text-end'>
        {current} / {max}
    </div>
</div>
{/if}
<div class='progressbar px-0'>
    <div class='pre'/>
    <div class='root'>
        <div class='label'>
            {#if !mute}
            <span class='label-container'>
                    {displayPercent} %
            </span>
            {/if}
        </div>
        {#each Array(nodes) as _, index}
            <div in:fade={{duration: mounted ? 250 : 0 }} class='node'/>
        {/each}
    </div>
    <div class='post'/>
</div>