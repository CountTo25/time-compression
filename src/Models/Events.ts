import DataController from "../Controllers/DataController";
import EventController from "../Controllers/EventController";
import type { Gamedata, gamedata } from "../Storage/gamedata";
import { tap } from "../Tools/tap";

const events: EventModel[] = [
    {
        name: 'Observation', 
        effect: ()=>DataController.awardData(1),
        messages: [
            'An event occured, providing you some data about this world',
            'By observing this cycle\'s flow, you obtained more data'
        ],
        unlocksAt: (gd) => true,
    },
    {
        name: 'Oddity',
        effect: null,
        messages: [
            'Your reading seems to provide some unknown data. You omit this record',
            'This iteration produced unreadable data. Throwing it away to keep database safe',
        ],
        unlocksAt: (gd) => true,
    },
    {
        name: 'Acceleration',
        effect: ()=>{EventController.shift(0.95); return 0},
        messages: [
            'Your interferience with this timeflow caused event occurrence to speed up'
        ],
        unlocksAt: (gd) => 'Chain of events' in gd.loops.current.buildings
    }
];



export default events;

type EventModel = {
    name: string,
    effect: ()=>number,
    messages: string[],
    unlocksAt: (gd: Gamedata) => boolean,
}
