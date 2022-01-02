<script lang='ts'>
    import EventController from "../Controllers/EventController";
    import { gamedata } from "../Storage/gamedata";
    export let filled: boolean = false;
    export let top: boolean = true;
    export let occursAt: number = 0;

    let left: any = EventController.getOffset(occursAt);
    $: $gamedata, (()=>{
        left = EventController.getOffset(occursAt);
    })()

    $:style = `margin-left: calc(${left}% - 21px); bottom: calc(${top?100:-100}% ${top? '+': '-'} 3px)`;
</script>


<span {style} class:pulse={filled}></span>


<style>
    span {
        transform: rotateZ(45deg);
        display: inline-block;
        height: 15px;
        width: 15px;
        border: 2px solid var(--color-font);
        margin: 3px;
        margin-left: 6px;
        margin-right: 6px;
        background-color: var(--color-bg-depth-1);
        transition: 0.5s all linear;
        position: absolute;
    }

    span.pulse::before {
        content: '';
        border-right: 2px solid var(--color-font);
        opacity: 0.75;
        position: absolute;
        left: 15px;
        height: 100%;
    }

    span::before, span::after {
        transition: 0.5s all;
        content: '';
        opacity: 0.75;
        position: absolute;
    }

    span:not(.pulse)::before, span:not(.pulse)::after {
        height: 0;
    }

    span.pulse::after {
        content: '';
        border-left: 2px solid var(--color-font);
        opacity: 0.75;
        position: absolute;
        right: 15px;
        height: 100%;
    }

    span.pulse {
        transform: rotateZ(135deg);
        background-color: var(--color-font);
    }
</style>