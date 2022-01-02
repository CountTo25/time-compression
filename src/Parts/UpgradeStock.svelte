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

<div class='title'>Upgrades</div>
<div class='wrap-stock mt-2 text-center'>
    {#if purchaseable.length === 0}
        No buildings available at the time
    {/if}
    {#each purchaseable as building}
    <div class='upgrade-node my-1'>
        <div class='subtitle oswld'>{building.name}</div>
        <div class='description text-start'>
            {building.description}
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
    {/each}
</div>


<style>
    .upgrade-node {
        padding: 3px;
        border-radius: 3px;
        border: 2px solid #ffffff91;
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