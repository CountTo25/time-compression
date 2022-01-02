<script lang="ts">
import { fade } from "svelte/transition";
import Button from "../Components/Button.svelte"
import FillableDot from "../Components/EventDot.svelte";
import LogEntry from "../Components/LogEntry.svelte";
import LoopController from "../Controllers/LoopController";
import TimeController from "../Controllers/TimeController";
import { gamedata } from "../Storage/gamedata";
import { logs } from "../Storage/logs";
import { toRender } from "../Storage/timeline";
import EventStock from "../Parts/EventStock.svelte";
import UpgradeStock from "../Parts/UpgradeStock.svelte";

$:$toRender, shouldShakeRender();
$:$gamedata, (()=>nextEvent = TimeController.getNextEvent())();
let nextEvent = '0s';
let previous: number = 0;
let shouldShake: boolean = false;

$:startButtonText = $gamedata.loops.current.running 
    ? $gamedata.loops.current.fresh ? 'Record loop' : 'Discard loop' 
    : $gamedata.loops.current.fresh ? 'Start observing' : 'Replay loop';

function shouldShakeRender() {
    const now = $toRender.length;
    if (now !== previous) {
        previous = now;
        shouldShake = !shouldShake;
    }
}

</script>

<div class='row'>
    <div class='col-12 text-center'>
            <div class='title mb-2'>Flow of events</div>
            <div class='controls text-center'>
                <Button
                    inactive={!$gamedata.loops.current.running} 
                    on:click={()=>LoopController.togglePause()}
                >{$gamedata.loops.current.paused ? 'Resume' : 'Pause'}</Button>
                <Button 
                    on:click={()=>(LoopController.getCurrentMainAction())()}
                >{startButtonText}</Button>
                <Button
                    on:click={()=>LoopController.storeLoop()}
                    inactive={$gamedata.loops.current.fresh}
                >Store loop
                </Button>
            </div>
            <div class='row px-0'>
                <div class='col-6 text-center'>
                    {#if $gamedata.loops.current.running}
                        <div>
                            Time elapsed: {TimeController.toPrintable($gamedata.loops.current.progress.time)}
                            {#if !$gamedata.loops.current.fresh}
                                / {TimeController.toPrintable($gamedata.loops.current.length)}
                            {/if}
                        </div>
                        <div>Next event: {nextEvent}</div>
                    {:else}
                        Loop not started yet
                    {/if}
                </div>
                <div class='col-6 text-center'>
                    <div>Total data: {$gamedata.data.amount}</div>
                    <div>This loop: {$gamedata.loops.current.dataDelta}</div>
                </div>
            </div>
    </div>
    <div class='col-12 px-0 text-center'>
        {#if !$gamedata.loops.current.running}
            <div>
            </div>
        {:else}
            <div class='timeline text-start'>
                <div>
                    {#each $toRender as occursAt}
                        <FillableDot {occursAt}/>
                    {/each}
                </div>
                <div class='timeline-split'></div>
                
            </div>

            <div class='row px-0 mt-2'>
                <div class='col-4'>
                    <div class='panel'>
                        <EventStock/>
                    </div>
                </div>

                <div class='col-4'>
                    <div class='panel'>
                        <UpgradeStock/>
                    </div>
                </div>

                <div class='col-4'>
                    <div class='panel'>
                        <div class='title'>Log</div>
                        <div class='mt-2 text-center log-wrap'>
                            {#each $logs as log}
                                <LogEntry {...log}/>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div> 

<style>
    .timeline-split {
        border-bottom: 2px solid white;
    }

    .timeline {
        position: relative;
        margin-top: 25px;
    }

    .panel {
        padding: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
        background-color: #151625;
        height: 100%;
    }

    .log-wrap {
        height: 30vh;
        overflow-y: scroll;
    }
</style>