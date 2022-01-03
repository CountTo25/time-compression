<script lang="ts">
import Router from "./Router/Router.svelte";
import SaveController from "./Controllers/SaveController";
import CheatController from "./Controllers/CheatController";
SaveController.load();
console.log('?');
//@ts-ignore
window.___cheats = CheatController;
</script>
<Router/>