import events from "../Models/Events";
import modifications from "../Models/Modifications";
import { Gamedata, gamedata } from "../Storage/gamedata";
import initializeController from "../Tools/initializeController";
import DatasetController from "./DatasetController";
import LoopController from "./LoopController";
import SaveController from "./SaveController";
import StoredLoopController from "./StoredLoopController";
import { Controller } from "./Support/Controller";

class TimeMachineController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
    ];
    private gamedata!: Gamedata;

    public getModifications() {
        return modifications.filter(m => m.unlocksAt(this.gamedata) || this.gamedata.timeMachine.modifications.includes(m.name));
    }

    public isModificationOwned(name: string) {
        return this.gamedata.timeMachine.modifications.includes(name);
    }

    public buyModification(name: string) {
        if (this.gamedata.timeMachine.modifications.includes(name)) {return;}
        const mod = modifications.find(m => m.name === name) ?? null;
        if (mod.price > this.gamedata.datasets.amount) {return;}
        this.gamedata.datasets.amount-=mod.price;
        this.gamedata.timeMachine.modifications.push(mod.name);
        if (mod.onPurchase !== undefined) {
            mod.onPurchase(this.gamedata);
        }
        gamedata.set(this.gamedata);
    }

    public getOwnedModifications() {
        return modifications.filter(m => this.gamedata.timeMachine.modifications.includes(m.name));
    }

    public reset() {
        const toAward = DatasetController.getNextResetDatasets();
        this.gamedata.datasets.amount+=toAward;
        this.gamedata.cycles.current.totalData = 0;
        this.gamedata.cycles.total++;
        this.gamedata.data.amount = 0;
        this.gamedata.events.stored = [];
        this.gamedata.loops.completed = [];
        this.gamedata.loops.current = {
            increment: this.gamedata.loops.current.increment,
            fresh: true,
            paused: false,
            dataDelta: 0,
            running: false,
            progress: {
                time: 0,
                next: 0,
            },
            length: 0,
            events: [],
            recorded: [],
            buildings: {},
        };
        gamedata.set(this.gamedata);
        StoredLoopController.clearLoops();
        SaveController.save();
    }
}

export default initializeController<TimeMachineController>(TimeMachineController);