<script lang="ts">
import Button from "../Components/Button.svelte";
import Progressbar from "../Components/Progressbar.svelte";
import StoredLoopController from "../Controllers/StoredLoopController";
import TimeController from "../Controllers/TimeController";
import { gamedata } from "../Storage/gamedata";

$: stubCount = $gamedata.loops.maxCompleted - $gamedata.loops.completed.length;
$:totalIncome = $gamedata.loops.completed.length > 0 ? ($gamedata.loops.completed.map(c => c.bakedIncome).reduce((a,b) => a+=b)
                / ($gamedata.loops.completed.map(c => c.duration).reduce((a,b) => a+=b) / 1000)).toFixed(2) : 0;

</script>

<div class='row'>
    <div class='col-12 text-center'>
            <div class='title mb-2'>Loop vault</div>
            <div class='mb-2'>Total income: {totalIncome}/s</div>
    </div>

    <div class='col-12 text-center'>
        <div class='row px-0'>
            {#each $gamedata.loops.completed as loop}
                <div class='col-4 mb-2'>
                    <div class='panel'>
                        <div class='row px-0'>
                            <div class='col-6'>
                                <div class='oswld loop-title'>Loop #{loop.increment}</div>
                            </div>
                            <div class='col-6 text-end'>
                                {(loop.bakedIncome/(loop.duration/1000)).toFixed(2)}/s
                            </div>
                        </div>
                        <div>Takes {TimeController.toPrintable(loop.duration)} to produce {loop.bakedIncome} data</div>
                        <div class='row px-0 mt-2'>
                            <div class='col-4 my-auto'>
                                <Button 
                                    mw={true}
                                    on:click={()=>StoredLoopController.discardLoop(loop.increment)}
                                >Discard</Button>
                            </div>
                            <div class='col-8 my-auto pb'>
                                <Progressbar
                                    tip={'cycle'}
                                    current={loop.progress.time}
                                    max = {loop.duration}
                                    displayCurrent = {TimeController.toPrintable(loop.progress.time)}
                                    displayMax = {TimeController.toPrintable(loop.duration)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
            {#each Array(stubCount) as _, i}
            <div class='col-4 mb-2'>
                <div class='panel text-center'>
                    empty slot
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .panel {
        padding: 5px;
        background-color: var(--color-panel);
        height: 100%;
    }

    .loop-title {
        text-align: start;
    }

    .pb {
        text-align: start;
    }
</style>