<script lang="ts">
import Button from "../Components/Button.svelte";
import DataController from "../Controllers/DataController";
import buildings from "../Models/Buildings";
import { gamedata } from "../Storage/gamedata";

let purchaseable = [];
$: $gamedata,(()=>
    purchaseable = $gamedata.loops.current.fresh 
        ? DataController.getPurchaseableBuildings()
        : buildings.filter(b => Object.keys($gamedata.loops.current.buildings).includes(b.name))
)()

</script>

<div class='row'>
<div class='title col-12'>Upgrades</div>
<div class='wrap-stock mt-2 col-12 row text-center'>
    {#if purchaseable.length === 0}

        <div>No upgrades available at the time</div>
    {/if}
    {#each purchaseable as building}
    <div class='col-6 my-1'>
        <div class='upgrade-node'>
        <div class='subtitle oswld'>{building.name}</div>
        <div class='description text-start'>
            {@html building.description}
        </div>
        <div class='actions my-1'>
            <div class='row px-0'>
                <div class='col-6 my-auto'>
                    {building.price} data
                </div>
                <div class='col-6 my-auto'>
                    {#if $gamedata.loops.current.fresh}
                    <Button 
                        mw={true} 
                        inactive={$gamedata.data.amount < building.price}
                        on:click={() => DataController.purchaseBuilding(building.name)}
                    >Buy</Button>
                    {:else}
                        purchased
                    {/if}
                </div>
            </div>
            </div>
        </div>
    </div>
    {/each}
    {#if $gamedata.loops.current.fresh}
        {#each Object.keys($gamedata.loops.current.buildings) as owned}
            <div class='col-6 my-1'>
                <div class='upgrade-node my-auto'>
                    <span class='oswld'>{owned}</span> <span class='fw-100'>(owned)</span>
                </div>
            </div>
        {/each}
    {/if}
</div>
</div>


<style>
    .upgrade-node {
        padding: 3px;
        border-radius: 3px;
        border: 2px solid #ffffff91;
        height: 100%;
    }

    .upgrade-node.buyable {

    }

    .description {
        font-size: 14px;
        font-weight: 100;
    }

    .subtitle {

    }

    .wrap-stock {
        height: 30vh;
        overflow-y: scroll;
    }
</style>