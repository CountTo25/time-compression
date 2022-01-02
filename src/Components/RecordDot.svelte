<script>
    export let filled = false;
</script>


<span on:click class:pulse={filled}></span>


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
        transition: 0.5s all;
        position: relative;
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