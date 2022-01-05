import DataController from "../Controllers/DataController";
import EventController from "../Controllers/EventController";
import LoopController from "../Controllers/LoopController";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { tap } from "../Tools/tap";

const events: EventModel[] = [
    {
        name: 'Observation', 
        effect: ()=>DataController.awardData(1),
        messages: [
            'An event was recorded, providing you some data about this world',
            'By observing this cycle\'s flow, you obtained more data',
            'Watching over this iteration gave you some valuable data',
        ],
        unlocksAt: (gd) => true,
        weight: 7,
    },
    {
        name: 'Noise',
        effect: null,
        messages: [
            'Your reading seems to provide some malformed data. You omit this record',
            'This iteration produced unreadable data. Throwing it away to keep database safe',
        ],
        unlocksAt: (gd) => true,
        weight: 1,
    },
    {
        name: 'Acceleration',
        effect: ()=>{EventController.shift(0.95); LoopController.refereshRender(); return 0},
        messages: [
            'Your interferience with this timeflow caused event occurrence to speed up'
        ],
        unlocksAt: (gd) => 'Chain of events' in gd.loops.current.buildings,
        weight: 2,
    },
];



export default events;

type EventModel = {
    name: string,
    effect: ()=>number,
    messages: string[],
    unlocksAt: (gd: Gamedata) => boolean,
    weight: number,
}
