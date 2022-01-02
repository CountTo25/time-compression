<script lang="ts">
import Button from "../Components/Button.svelte";


</script>

<div class='title'>Upgrades</div>
<div class='wrap-stock'>
    <div class='mt-2 text-center'>
        <div class='upgrade-node my-1'>
            <div class='subtitle oswld'>Chain of events</div>
            <div class='description text-start'>
                Accelerate event appearance rate by using data to predict what actions cause which events
            </div>
            <div class='actions my-1'>
                <div class='row px-0'>
                    <div class='col-6 my-auto'>
                        10 data
                    </div>
                    <div class='col-6 my-auto'>
                        <Button mw={true} inactive={true}>Buy</Button>
                    </div>
                </div>
            </div>
        </div>

        <div class='upgrade-node my-1'>
            <div class='subtitle oswld'>Careful analytics</div>
            <div class='description text-start'>
                Dig deeper into events that occur and extract more data from them
            </div>
            <div class='actions my-1'>
                <div class='row px-0'>
                    <div class='col-6 my-auto'>
                        40 data
                    </div>
                    <div class='col-6 my-auto'>
                        <Button mw={true} inactive={true}>Buy</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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