import DataController from "../Controllers/DataController";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { hooks } from "../Storage/loopHooks";
import { tap } from "../Tools/tap";

const buildings: BuildingModel[] = [
    {
        name: 'Chain of events', 
        unlocksAt: (gd) => gd.data.amount >= 10,
        onetime: true,
        price: 15,
        onActive: () => (hooks.update(h => {
            h.onEventRoll.push((gd, o) => {
                o.occursAt-=100;
            });
            return h
        })),
        description: 'Use your knowledge on to predict what actions lead to which events'
    },
    {
        name: 'Careful observation', 
        unlocksAt: (gd) => gd.data.amount >= 5,
        onetime: true,
        price: 10,
        onActive: () => (hooks.update(h => {
            h.onIncome.push((gd, income) => {
                income.value+=1;
            });
            return h
        })),
        description: 'Use your knowledge on to predict what actions lead to which events'
    },
];



export default buildings;

type BuildingModel = {
    name: string,
    price: number,
    description: string,
    onetime: boolean,
    unlocksAt: (gd: Gamedata) => boolean,
    onActive: Function,
}
