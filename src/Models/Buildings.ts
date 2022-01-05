import DataController from "../Controllers/DataController";
import LoopController from "../Controllers/LoopController";
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
            h.onEventRoll.push((gd, o, now) => {
                const diff = o.occursAt - now;
                if (diff > 0) {o.occursAt-=100}
            });
            return h
        })),
        description: `Use your knowledge on to predict what actions lead to which events<br>Reduce new events spawn time by 0.1s`,
        toAuto: 5,
        explainedCondition: 'whenever you have more than 10 data on hands'
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
        description: 'Use your knowledge on to predict what actions lead to which events',
        toAuto: 5,
        explainedCondition: 'when you have more than 5 data'
    },
    {
        name: 'Probability manipulator',
        unlocksAt: (gd) => gd.loops.current.progress.time > 10_000,
        onetime: true,
        price: 15,
        onActive: () => (hooks.update(h => {
            h.onIncome.push((gd, income) => {
                if (Math.random() > 0.5) {
                    income.value*=2;
                }
            });
            return h;
        })),
        description: 'Manipulate probabilities to allow any data income to be doubled with 50% chance',
        toAuto: 10,
        explainedCondition: 'once timer reached 10 seconds'
    },
    {
        name: 'Timeline wrapper',
        unlocksAt: (gd) => gd.meta.records.totalEvents > 100,
        onetime: true,
        price: 50,
        onActive: () => (hooks.update(h => {
            h.onEventRoll.push((gd, occurstAt, now) => {
                if (Math.random() <= 0.1) {
                    const index = Math.floor(Math.random()*gd.loops.current.events.length);
                    LoopController.addEvent(index)
                }
            })
            h.onIncome.push((gd, income) => {
                if (Math.random() <= 0.5) {
                    income.value*=2;
                }
            });
            return h;
        })),
        description: 'Add 10% chance to spawn one more event after any of currently queued events',
        toAuto: 10,
        explainedCondition: 'once timer reached 10 seconds'
    }
];



export default buildings;

type BuildingModel = {
    name: string,
    price: number,
    description: string,
    onetime: boolean,
    unlocksAt: (gd: Gamedata) => boolean,
    onActive: Function,
    toAuto: number,
    explainedCondition: string,
}
