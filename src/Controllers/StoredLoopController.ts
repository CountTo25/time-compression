import buildings from "../Models/Buildings";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Hooks, hooks } from "../Storage/loopHooks";
import tickers, {clearTickers, pushListener} from "../Storage/tickers";
import { toRender } from "../Storage/timeline";
import initializeController from "../Tools/initializeController";
import DataController from "./DataController";
import EventController from "./EventController";
import { Controller } from "./Support/Controller";

class StoredLoopController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'tickers', source: tickers},
        {key: 'toRender', source: toRender},
        {key: 'hooks', source: hooks},
    ];
    private gamedata!: Gamedata;
    private loopTicker: {[key: number]: ReturnType<typeof setInterval>}[] =  [];

    public bootLoop(id: number) 
    {
        if (!(this.gamedata.loops.completed.map(c => c.increment).includes(id))) {return;}
        const index = this.gamedata.loops.completed.indexOf(this.gamedata.loops.completed.filter(l => l.increment === id)[0]);
        this.loopTicker.push({[id]: setInterval(()=>{
            this.gamedata.loops.completed[index].progress.time+=100;
            if (this.gamedata.loops.completed[index].progress.time >= this.gamedata.loops.completed[index].duration) {
                this.gamedata.loops.completed[index].progress.time = 0;
                const income = this.gamedata.loops.completed[index].bakedIncome;
                this.gamedata.data.amount += income;
                this.gamedata.cycles.current.totalData+= income;
                gamedata.set(this.gamedata);
            }
        }, 100)})
    }

    public clearLoops() {
        for (const ticker of this.loopTicker) {
            for (const key of Object.keys(ticker)) {
                clearInterval(ticker[key]);
            }
        }
        this.loopTicker = [];
    }

    public discardLoop(id: number): void
    {
        if (!(this.gamedata.loops.completed.map(c => c.increment).includes(id))) {return;}
        const index = this.gamedata.loops.completed.indexOf(this.gamedata.loops.completed.filter(l => l.increment === id)[0]);
        this.gamedata.loops.completed.splice(index, 1);        
        this.clearLoops();
        delete this.loopTicker[id];
        for (const l of this.gamedata.loops.completed) {
            this.bootLoop(l.increment);
        }
        gamedata.set(this.gamedata);
    }
}

export default initializeController<StoredLoopController>(StoredLoopController);