import DataController from "../Controllers/DataController";
import { gamedata } from "../Storage/gamedata";
import { tap } from "../Tools/tap";

const events: EventModel[] = [
    {
        name: 'Observation', 
        effect: ()=>DataController.awardData(1),
        messages: [
            'An event occured, providing you some data about this world',
            'By observing this cycle\'s flow, you obtained more data'
        ]
    },
    {
        name: 'Oddity',
        effect: null,
        messages: [
            'Your reading seems to provide some unknown data. You omit this record',
            'This iteration produced unreadable data. Throwing it away to keep database safe',
        ]
    },
];



export default events;

type EventModel = {
    name: string,
    effect: ()=>number,
    messages: string[],
}
