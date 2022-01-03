import DataController from "../Controllers/DataController";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { hooks } from "../Storage/loopHooks";
import { tap } from "../Tools/tap";

const modifications: AchievmentModel[] = [
    {
        name: 'Out of time',
        description: 'Finish your first time loop',
        unlocksAt: (gd) => gd.meta.totals.loops > 0,
    },
]
  
export default modifications;

type AchievmentModel = {
    name: string,
    description: string,
    unlocksAt: (gd: Gamedata) => boolean,
}
