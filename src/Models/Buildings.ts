import DataController from "../Controllers/DataController";
import LoopController from "../Controllers/LoopController";
import TimeController from "../Controllers/TimeController";
import IncomePipeline from "../Pipelines/IncomePipeline";
import type Pipeable from "../Pipelines/Pipeable";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { pushLog } from "../Storage/logs";
import { hooks } from "../Storage/loopHooks";
import { tap } from "../Tools/tap";

const buildings: BuildingModel[] = [
    {
        name: 'Chain of events', 
        unlocksAt: (gd) => gd.data.amount >= 10,
        condition: (gd) => true,
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
        condition: (gd) => true,
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
        explainedCondition: 'when you have more than 5 data',
    },
    {
        name: 'Probability manipulator',
        unlocksAt: (gd) => gd.loops.current.progress.time > 10_000,
        condition: (gd) => gd.loops.current.progress.time > 10_000,
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
        condition: (gd) => true,
        onetime: true,
        price: 50,
        onActive: () => (hooks.update(h => {
            h.onEventConsumed.push((gd) => {
                const roll = Math.random();
                console.log('roll' + roll);
                if (roll <= 0.1) {
                    console.log('wraped');
                    pushLog('Timeline wrapper forced new event to appear on timeline', TimeController.now())
                    const index = Math.floor(Math.random()*gd.loops.current.events.length);
                    LoopController.addEvent(2000);
                }
            })
            h.onIncome.push((gd, income) => {
                if (Math.random() <= 0.5) {
                    income.value*=2;
                }
            });
            return h;
        })),
        description: 'Add 10% chance to spawn one more event 2 seconds from now whenever you analyze an event',
        toAuto: 10,
        explainedCondition: 'once timer reached 10 seconds'
    },
    {
        name: 'Positive feedback loop',
        description: 'Increase all data gained by 0.2 per every analyzed event',
        toAuto: 10,
        price: 25,
        explainedCondition: 'Reach total of 15 consumed events at least once',
        unlocksAt: (gd: Gamedata) => gd.meta.records.eventsPerLoop >= 15,
        condition: (gd) => true,
        onetime: true,
        onActive: null,
        turnsOnAt: IncomePipeline,
        effect: (pipe: IncomePipeline) => pipe.income+=Math.floor(pipe.gamedata.loops.current.consumedEvents/5),
    },
    {
        name: 'Data comparision',
        description: 'Increase all data gained by 1 + 0.25 per unspent dataset',
        toAuto: 5,
        price: 5,
        explainedCondition: 'Have more than 1 dataset',
        unlocksAt: (gd: Gamedata) => gd.datasets.amount >= 1,
        condition: (gd) => true,
        onetime: true,
        onActive: null,
        turnsOnAt: IncomePipeline,
        effect: (pipe: IncomePipeline) => pipe.income+= 1 + Math.floor(pipe.gamedata.datasets.amount/4),
    },
    {
        name: 'Event horizon',
        description: 'Reduce gap between newly spawned events by 0.01s per each event analyzed',
        toAuto: 10,
        price: 30,
        unlocksAt: (gd: Gamedata) => gd.meta.totals.datasets >= 5,
        onetime: true,
        onActive: () => (hooks.update(h => {
            h.onEventRoll.push((gd, o, now) => {
                const diff = o.occursAt - now;
                const calc = (gd.loops.current.consumedEvents*10);
                if (diff - calc > 0) {o.occursAt-=calc}
                else {o.occursAt = gd.loops.current.progress.time}
            });
            return h
        })),
        condition: (gd) => true,
        explainedCondition: 'after you have more than 5 datasets earned in total'
    }

];



export default buildings;

type BuildingModel = {
    name: string,
    price: number,
    description: string,
    onetime: boolean,
    unlocksAt: (gd: Gamedata) => boolean,
    condition: (gd: Gamedata) => boolean,
    onActive: Function,
    toAuto: number,
    explainedCondition: string,
} & Pipeable
