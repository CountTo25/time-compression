import events from "../Models/Events";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Log, logs, pushLog } from "../Storage/logs";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";

class EventController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'logs', source: logs}
    ];
    private gamedata!: Gamedata;
    private logs!: Log[];

    public serveEvent() {

    }

    public getOffset(occurstAt: number): number
    {
        const current = this.gamedata.loops.current.progress.time; //1000
        //1400
        if (occurstAt - current > 5000) {return 100}
        if (occurstAt - current <= 0 ) {return 0}
        return (occurstAt - current)/5000 * 100;
    }

    public resolveEvent(name: string) {
        return events.filter(e => e.name === name)[0] ?? null
    }

    public logRecord(index: number): void
    {
        if (index > this.gamedata.events.stored.length - 1) {return;}
        const event = this.resolveEvent(this.gamedata.events.stored[index].payload);
        let deltaData = 0;
        if (event === null) {return}
        if (event.effect !== null) {deltaData = event.effect()}
        const message = event.messages[Math.floor(Math.random()*event.messages.length)];
        pushLog(
            message,
            this.gamedata.events.stored[index].occursAt
        );

        this.gamedata.loops.current.recorded.push({
            at: this.gamedata.events.stored[index].occursAt,
            message,
            deltaData,
            consumed: false,
        });

        this.gamedata.events.stored.splice(index, 1);

        gamedata.set(this.gamedata);
        
    }


    public getRandomEvent() {
        const rollable = events.filter(e => e.unlocksAt(this.gamedata));
        return rollable[Math.floor(rollable.length * Math.random())];
    }

    public shift(amount: number) {
        this.gamedata.loops.current.events = this.gamedata.loops.current.events.map(e => {
            const newOccurrence = e.occursAt * amount > this.gamedata.loops.current.progress.time 
                ? e.occursAt * amount
                : e.occursAt
            return {...e, occursAt: newOccurrence}
        })
    }
}

export default initializeController<EventController>(EventController);