<script lang="ts">
import type { ProgressRecord } from "../../Storage/explorationFight";

import type { Character } from "../../Storage/gamedata";
import Progressbar from "../Progressbar.svelte";
export let character: Character;
export let name: string;
export let turnProgress: ProgressRecord;
</script>

<div class='wrap'>
    <div class='text-start'>
        <Progressbar mute={true} current={turnProgress.progress.current} max={turnProgress.progress.max}/>
    </div>
    <div class='name'>{name}</div>
    <div>{character.currentState.health.current} / {character.currentState.health.max} HP</div>
    <div class='row px-0'>
        <div class='text-start col-6 px-0'>
            <div><span class='name'>{character.stats.strength}</span> strength</div>
            <div><span class='name'>{character.stats.agility}</span> agility</div>
            <div><span class='name'>{character.stats.intelligence}</span> intelligence</div>
        </div>
        <div class='text-end col-6 px-0'>
            <div>constitution <span class='name'>{character.stats.constitution}</span></div>
            <div>dexterity <span class='name'>{character.stats.dexterity}</span></div>
            <div>luck <span class='name'>{character.stats.luck}</span></div>
        </div>

        <div class='text-center col-12 px-0'>
            Skills
        </div>
    </div>
</div>


<style>
    .wrap {
        border: 2px solid var(--color-font);
        padding: 3px;
    }

    .wrap .name {
        font-family: 'Oswald', sans-serif;
    }
</style>