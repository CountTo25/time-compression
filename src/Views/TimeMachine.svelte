<script>
import Button from "../Components/Button.svelte";

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
                0
            </div>
            <div class='explanation text-center mt-2'>
                Total data obtained until next dataset: 200 (current: 0)
            </div>
            <div class='text-center mt-3'>
                <Button mw={true}>Compile</Button>
            </div>
        </div>
    </div>
    <div class='col-8'>
        <div class='panel'>
            <div class='title text-center'>Modifications</div>
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
</style>