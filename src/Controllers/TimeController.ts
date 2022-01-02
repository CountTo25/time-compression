import events from "../Models/Events";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Log, logs, pushLog } from "../Storage/logs";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";

class TimeController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'logs', source: logs}
    ];
    private gamedata!: Gamedata;
    private logs!: Log[];

    public toPrintable(time: number): string
    {
        return (time/1000).toFixed(2)+' s';
    }

    public getNextEvent() {
        const fresh = this.gamedata.loops.current.fresh;
        const evt =  (fresh 
            ? this.gamedata.loops.current.events[0] 
            : this.gamedata.loops.current.recorded.filter(r => !r.consumed)[0]
        ) ?? null;
        if (evt === null) {return 'never'}
        //@ts-ignore
        const time = fresh ? evt.occursAt : evt.at;
        return this.toPrintable(time);
    }
}

export default initializeController<TimeController>(TimeController);