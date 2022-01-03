import DataController from "../Controllers/DataController";
import EventDispatchPipeline from "../Pipelines/EventDispatchPipeline";
import type Pipeline from "../Pipelines/Pipeline";
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
        price: 20,
        description: 'Time compression engine that shortens timespan between various events occuring in the world<br>Reduces gaps in time between events by 10%',
        unlocksAt: (gd) => gd.meta.records.eventsPerLoop > 20,
        turnsOnAt: EventDispatchPipeline,
        effect: (pipe: EventDispatchPipeline) => pipe.diff*=0.9
    },
    
]
  
export default modifications;

type ModificationModel = {
    name: string,
    price: number,
    description: string,
    unlocksAt: (gd: Gamedata) => boolean,
    turnsOnAt: typeof Pipeline,
    effect: (pipe: Pipeline) => any,
}
