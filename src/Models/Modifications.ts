import DataController from "../Controllers/DataController";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { hooks } from "../Storage/loopHooks";
import { tap } from "../Tools/tap";

const modifications: ModificationModel[] = [
    {
        name: 'Compression engine',
        price: 100,
        description: 'Time compression engine that shortens timespan between various events occuring in the world<br>Reduces gaps in time between events by 10%',
        unlocksAt: (gd) => gd.meta.records.eventsPerLoop > 20,
    },
]
  
export default modifications;

type ModificationModel = {
    name: string,
    price: number,
    description: string,
    unlocksAt: (gd: Gamedata) => boolean,
}
