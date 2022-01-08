<script>
import Button from "../Components/Button.svelte";
import DatasetController from "../Controllers/DatasetController";
import TimeMachineController from "../Controllers/TimeMachineController";
import modifications from "../Models/Modifications";
import { gamedata } from "../Storage/gamedata";

let nextReboot = 0;
let dataToNextReboot = 0;
let renderableModifications = TimeMachineController.getModifications();
$:$gamedata,(() => {
    nextReboot = DatasetController.getNextResetDatasets();
    dataToNextReboot = DatasetController.getDataToNext();
    renderableModifications = TimeMachineController.getModifications();
})()

</script>
<div class='row'>
    <div class='col-12 text-center'>
        <div class='title mb-2'>Time Machine</div>
    </div>
</div>

<div class='row px-0'>
    <div class='col-4'>
        <div class='panel'>
            <div class='title text-center'>Compile dataset</div>
            <div class='explanation text-center mt-2'>
                Compile your research results and rerun your time machine back to the point when you started this research<br>
                Use obtained datasets to improve the way your time machine acts and make events occur more frequently
            </div>
            <div class='title text-center mt-2'>
                Datasets compiled on reboot:
            </div>
            <div class='title text-center'>
                {nextReboot}
            </div>
            <div class='explanation text-center mt-2'>
                Total data obtained until next dataset: {dataToNextReboot} (current: {$gamedata.cycles.current.totalData})
            </div>
            <div class='text-center mt-3'>
                <Button on:click={()=>TimeMachineController.reset()} inactive={nextReboot === 0} mw={true}>Compile</Button>
            </div>
        </div>
    </div>
    <div class='col-8'>
        <div class='panel'>
            <div class='title text-center'>Modifications</div>
            <div class='title text-center'>Owned datasets: {$gamedata.datasets.amount}</div>
            <div class='row px-0'>
                
            {#each renderableModifications as modification}
                <div class='col-4 my-1'>
                    <div class='wrap-mod'>
                    <div class='oswld text-center'>{modification.name}</div>
                    <div class='fs-100'>{@html modification.description}</div>
                    {#if TimeMachineController.isModificationOwned(modification.name)}
                        <div class='text-center oswld'>Owned</div>
                    {:else}
                        <div class='text-center oswld mt-1'>required datasets: {modification.price}</div>
                        <div class='text-center'>
                            <Button 
                                mw={true} 
                                on:click={()=>TimeMachineController.buyModification(modification.name)}
                                inactive={modification.price > $gamedata.datasets.amount}
                            >buy</Button>
                        </div>
                    {/if}
                    </div>
                </div>
            {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .panel {
        padding: 5px;
        background-color: var(--color-panel);
        height: 100%;
    }

    .explanation {
        font-weight: 100;
    }

    .wrap-mod {
        padding: 5px;
        border: 2px solid white;
        height: 100%;
    }
</style>