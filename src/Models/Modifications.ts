import TriggerController from "../Controllers/TriggerController";
import EventDispatchPipeline from "../Pipelines/EventDispatchPipeline";
import type Pipeline from "../Pipelines/Pipeline";
import RestartPipeline from "../Pipelines/RestartPipeline";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { hooks } from "../Storage/loopHooks";
import { tap } from "../Tools/tap";

const modifications: ModificationModel[] = [
    {
        name: 'Compression of time',
        price: 1,
        description: 'Compress timelines to make events more frequent. Reduces delay between new events by 5%',
        unlocksAt: (gd) => true,
        turnsOnAt: EventDispatchPipeline,
        effect: (pipe: EventDispatchPipeline) => pipe.diff*=0.95,
    },
    {
        name: 'Compression engine',
        price: 10,
        description: 'Time compression engine that shortens timespan between various events occuring in the world<br>Reduces gaps in time between events by 10%',
        unlocksAt: (gd) => gd.meta.records.eventsPerLoop >= 20,
        turnsOnAt: EventDispatchPipeline,
        effect: (pipe: EventDispatchPipeline) => pipe.diff*=0.9
    },
    {
        name: 'Event processor',
        price: 10,
        description: 'Automatically process 1 event every 5 seconds',
        unlocksAt: (gd) => gd.datasets.amount >= 5,
        turnsOnAt: null,
        effect: null,
    },
    {
        name: 'Machine mainframe',
        price: 10,
        unlocksAt: (gd) => gd.meta.totals.datasets >= 3,
        turnsOnAt: null,
        effect: null,
        onPurchase: (gd) => TriggerController.set('mainframe'),
        description: 'Unlocks a way to build and improve time machine mainframe',
    },
    {
        name: 'Improved storage',
        price: 3,
        description: 'Increase recorded loop storage by one',
        unlocksAt: (gd) => gd.meta.totals.datasets >= 2,
        turnsOnAt: null,
        effect: null,
        onPurchase: (gd) => gd.loops.maxCompleted++, 
    },
    {
        name: 'Accumulated knowledge',
        price: 4,
        unlocksAt: (gd) => gd.meta.totals.datasets >= 4,
        description: 'Add 10 data whenever you restart your time machine',
        turnsOnAt: RestartPipeline,
        effect: (pipe: RestartPipeline) => pipe.startingData+=10,
    }
    
]
  
export default modifications;

type ModificationModel = {
    name: string,
    price: number,
    description: string,
    unlocksAt: (gd: Gamedata) => boolean,
    turnsOnAt: typeof Pipeline,
    effect: (pipe: Pipeline) => any,
    onPurchase?: (gd: Gamedata) => void, 
}
