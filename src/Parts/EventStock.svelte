<script lang="ts">
    import { gamedata } from "../Storage/gamedata";
    import EventController from "../Controllers/EventController";
    import RecordDot from "../Components/RecordDot.svelte";
import Button from "../Components/Button.svelte";
import LogEntry from "../Components/LogEntry.svelte";
import { logs } from "../Storage/logs";
import App from "../App.svelte";

    $: mapped = $gamedata.loops.current.recorded.map(r => r.deltaData)
    $:totalIncome = $gamedata.loops.current.fresh ? 0 : mapped.length > 0 ? mapped.reduce((r,x) => r+=x) : 0;
    $:perSecond = $gamedata.loops.current.fresh ? 0 : totalIncome / ($gamedata.loops.current.length / 1000);
</script>

<div class='title'>Recorded events</div>
<div class='mt-2 text-center'>
    {#if $gamedata.loops.current.fresh}
        {#each Array($gamedata.events.capacity) as _, index}
            <RecordDot 
                on:click={()=>EventController.logRecord(index)} 
                filled={index < $gamedata.events.stored.length}
            />
        {/each}
        <div>
            <Button 
                inactive={$gamedata.events.stored.length === 0}
                on:click={()=>EventController.logRecord(0)}
            >Analyze log</Button>
        </div>
        <div class='text-center oswld'>Latest analyzed event:</div>
        {#if $logs.length > 0}
        <LogEntry {...$logs[0]}></LogEntry>
        {:else}
            <div class='text-center'>none analyzed yet</div>
        {/if}
    {:else}
        <div>Total events: {$gamedata.loops.current.recorded.length}</div>
        <div>Income: {totalIncome} ({perSecond.toFixed(2)}/s)</div>
        <div class='text-center oswld'>Latest analyzed event:</div>
        {#if $logs.length > 0}
        <LogEntry {...$logs[0]}></LogEntry>
        {:else}
            <div class='text-center'>none analyzed yet</div>
        {/if}
    {/if}
</div>
