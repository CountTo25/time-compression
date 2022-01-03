import buildings from "../Models/Buildings";
import EventDispatchPipeline from "../Pipelines/EventDispatchPipeline";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Hooks, hooks } from "../Storage/loopHooks";
import tickers, {clearTickers, pushListener} from "../Storage/tickers";
import { toRender } from "../Storage/timeline";
import initializeController from "../Tools/initializeController";
import DataController from "./DataController";
import EventController from "./EventController";
import StoredLoopController from "./StoredLoopController";
import { Controller } from "./Support/Controller";
import TimeMachineController from "./TimeMachineController";

class LoopController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'tickers', source: tickers},
        {key: 'toRender', source: toRender},
        {key: 'hooks', source: hooks},
    ];
    private gamedata!: Gamedata;
    private tickers!: Function[];
    private toRender!: number[];
    private hooks!: Hooks;

    private loopTicker: ReturnType<typeof setInterval> =  null;

    public toggleLoop(): void
    {
        let running: boolean = this.gamedata.loops.current.running;
        if (running) {this.recordLoop(); return;}
        this.startLoop();
    }

    public discardLoop(): void 
    {
        this.freshLoopData();
        this.rehook();
        gamedata.set(this.gamedata);
    }

    public getCurrentMainAction(): Function {
        if (this.gamedata.loops.current.fresh) {
            return this.toggleLoop.bind(this);
        }

        if (!this.gamedata.loops.current.fresh) {
            return this.discardLoop.bind(this);
        }
    }

    private recordLoop(): void
    {
        this.gamedata.loops.current.dataDelta = 0;
        this.gamedata.loops.current.running = false;
        this.gamedata.loops.current.events = [];
        this.gamedata.events.stored = [];
        this.gamedata.loops.current.fresh = false;
        this.gamedata.loops.current.paused = false;
        this.gamedata.loops.current.length = this.gamedata.loops.current.progress.time;
        this.rehook();
        this.gamedata.meta.totals.loops++;
        gamedata.set(this.gamedata);
    }

    private rehook() {
        this.hooks = {onEventRoll: [], onIncome: []};
        hooks.set(this.hooks);
        for (const key in this.gamedata.loops.current.buildings) {
            buildings.filter(b => b.name === key)[0].onActive();
        }
    }

    private refereshRender(): void
    {
        toRender.set([
            ...this.gamedata.loops.current.recorded.map(pb => pb.at), 
            ...this.gamedata.loops.current.events.map(e => e.occursAt)
        ]);
    }

    private startLoop(): void
    {
        this.gamedata.loops.current.running = true;
        this.gamedata.loops.current.progress.time = 0;
        if (!this.gamedata.loops.current.fresh) {
            this.gamedata.loops.current.paused = false;
            this.gamedata.loops.current.recorded = this.gamedata.loops.current.recorded
                .map(r => {r.consumed = false; return r})
        } else {
            this.seedEvents();
        }
        this.refereshRender();
        this.restartInterval();
        this.rehook();
        gamedata.set(this.gamedata);
    }

    private seedEvents(): void
    {
        const count = 5;
        for (let i = 0; i<count; i++) {
            let occursAt = (i+1)*1000;
            const pipe = new EventDispatchPipeline();
            for (const mod of TimeMachineController.getOwnedModifications()) {
                if (EventDispatchPipeline === mod.turnsOnAt) {
                    pipe.pushMember(mod.effect);
                }
            }
            occursAt = pipe.run(occursAt);
            const payload = EventController.getRandomEvent().name;
            this.gamedata.loops.current.events.push({occursAt,payload})
            this.toRender.push(occursAt);
        }
    }

    public tick(): void {
        if (this.gamedata.loops.current.paused) {
            return;
        }

        this.gamedata.loops.current.progress.time+=100;

        if (!this.gamedata.loops.current.fresh) {
            if (this.gamedata.loops.current.length <= this.gamedata.loops.current.progress.time) {
                this.recordLoop();
                this.startLoop();
            }

            const consumable = this.gamedata.loops.current.recorded
                .filter(e => this.gamedata.loops.current.progress.time >= e.at && !e.consumed);
            for (const c of consumable) {
                const index = this.gamedata.loops.current.recorded.indexOf(c);
                DataController.awardData(c.deltaData, true);
                this.gamedata.loops.current.recorded[index].consumed = true;
            }
        } else {
            const passed = this.gamedata.loops.current.events
            .filter(e => this.gamedata.loops.current.progress.time >= e.occursAt);

        if (passed.length > 0 ) {
            for (const evt of passed) {
                if (this.gamedata.events.capacity > this.gamedata.events.stored.length) {
                    this.gamedata.events.stored.push({...evt, message: '123'}); //TODO: snatch log
                }
                const index = this.gamedata.loops.current.events.indexOf(evt);
                this.gamedata.loops.current.events.splice(index, 1);
                this.addEvent();
            }
        }
        }

       
        gamedata.set(this.gamedata);
    }

    public togglePause(): void 
    {
        if (!this.gamedata.loops.current.running) {return;}
        this.gamedata.loops.current.paused = !this.gamedata.loops.current.paused;
        gamedata.set(this.gamedata)
    }

    private restartInterval(): void {
        if (this.loopTicker !== null) {
            clearInterval(this.loopTicker);
        }
        clearTickers();
        pushListener(this.tick.bind(this));
        this.loopTicker = setInterval(()=>{
            for (const subscribed of this.tickers) {
                subscribed()
            }
        }, 100)
    }

    public reboot(): void 
    {
        this.restartInterval();
        this.rehook();
    }

    private addEvent(): void
    {
        const baseDiff = 1000; //TODO: remake formula
        const events = this.gamedata.loops.current.events;
        const occursAt = 
            events[events.length - 1].occursAt 
            + (baseDiff * (this.gamedata.loops.current.progress.time / 1000));

        const payload = EventController.getRandomEvent().name;
        const wrapped = {occursAt}
        for (const hook of this.hooks.onEventRoll) {
            hook(this.gamedata, wrapped, this.gamedata.loops.current.progress.time);
        }

        const pipe = new EventDispatchPipeline();
        let diff = wrapped.occursAt - this.gamedata.loops.current.progress.time;
        diff = pipe.run(diff);
        wrapped.occursAt = //pipe.pushMember().run(wrapped.occursAt);

        this.gamedata.loops.current.events.push({
            occursAt: wrapped.occursAt,
            payload,
        });
        this.toRender.push(occursAt);
        toRender.set(this.toRender);
    }

    public storeLoop() {
        const copy = this.gamedata.loops.current;
        if (this.gamedata.loops.maxCompleted <= this.gamedata.loops.completed.length) {return;}
        const totalIncome = this.gamedata.loops.current.recorded.map(r => r.deltaData);
        let bakedIncome = 0;
        if (totalIncome.length > 0) {
            bakedIncome = totalIncome.reduce((a,b) => a+=b);
        }
        const duration = this.gamedata.loops.current.length;
        const id = this.gamedata.loops.current.increment;
        this.gamedata.loops.completed.push({...copy, bakedIncome, duration});
        this.freshLoopData();
        this.rehook();
        gamedata.set(this.gamedata);
        hooks.set(this.hooks);
        StoredLoopController.bootLoop(id);
    }

    private freshLoopData() {
        this.gamedata.loops.current = {
            increment: this.gamedata.loops.current.increment + 1,
            fresh: true,
            paused: false,
            dataDelta: 0,
            running: false,
            progress: {
                time: 0,
                next: 0,
            },
            length: 0,
            buildings: {},
            events: [],
            recorded: [],
        };
    }
}

export default initializeController<LoopController>(LoopController);