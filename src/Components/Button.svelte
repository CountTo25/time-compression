<script lang="ts">
    export let mw: boolean = false;
    export let highlight: boolean = false;
    export let inactive: boolean = false;
</script>

<span on:click class:w-100-p={mw} class:inactive class:highlight class='button shadow mnt'>
    <slot/>
</span>