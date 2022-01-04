<script>

import Button from "../Components/Button.svelte";
import buildings from "../Models/Buildings";
import { gamedata } from "../Storage/gamedata";
import DatabaseController from "../Controllers/DatabaseController";

let totalPrice = 0;
let purchased = buildings.filter(b => Object.keys($gamedata.knowledge.buildings.purchased).includes(b.name));
$: gamedata, (() => {
    purchased = buildings.filter(b => Object.keys($gamedata.knowledge.buildings.purchased).includes(b.name));
    const autoBuildings = buildings.filter(b => $gamedata.knowledge.buildings.auto.includes(b.name));
    if (autoBuildings.length > 0) {
        totalPrice = autoBuildings.map(b => b.price).reduce((a,b) => a+=b);
    } else {
        totalPrice = 0;
    }
})()



</script>
<div class='row'>
    <div class='col-12 text-center'>
            <div class='title mb-2'>Database</div>
    </div>
</div>

<div class='row'>
    <div class='col-4'>
        <div class='title text-center mb-1'>Upgrades</div>
        <div class='mb-1 fw-100 text-center'>
            Total autobuy price: {totalPrice} data per loop
        </div>
        <div class='panel px-1'>
        {#key gamedata}
        {#each purchased as building}
            <div class='wrap-upgrade mb-2'>
                <div class='oswld'>
                    {building.name}
                </div>
                <div class='text-center'>
                    {#if $gamedata.knowledge.buildings.purchased[building.name] >= building.toAuto}
                        <Button on:click={()=>DatabaseController.toggleAuto(building.name)}
                            >{$gamedata.knowledge.buildings.auto.includes(building.name) ? 'Disable': 'Enable'} autobuy</Button>
                    {:else}
                        purchase {building.toAuto - $gamedata.knowledge.buildings.purchased[building.name]} more to autobuy
                    {/if}
                </div>
                <div class='mt-1 fw-100 ms-2'>
                    {@html building.description}
                </div>
                <div class='mt-1'>
                    Unlocks {building.explainedCondition}
                </div>
                <div class='mt-1'>
                    Costs {building.price} data
                </div>
            </div>
        {/each}
        {/key}
    </div>
    </div>
</div>

<style>
    .wrap-upgrade {
        border: 2px solid white;
        padding: 5px;
    }

    .panel {
        padding: 5px;
        max-height: 60vh;
        overflow-y: scroll;
        background-color: var(--color-panel);
    }
</style>