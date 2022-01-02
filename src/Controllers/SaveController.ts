
import buildings from "../Models/Buildings";
import events from "../Models/Events";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Log, logs, pushLog } from "../Storage/logs";
import { Hooks, hooks } from "../Storage/loopHooks";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";
import {deepmerge} from "../Tools/deepmerge";
import moment from "moment";
import LoopController from "./LoopController";
import StoredLoopController from "./StoredLoopController";

class SaveController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'hooks', source: hooks},
    ];
    private gamedata!: Gamedata;

    public load() {
        if (!('__tcsave' in localStorage)) {
            return;
        }
        console.log(this.gamedata);
        this.gamedata = deepmerge(this.gamedata, JSON.parse(localStorage.__tcsave));
        gamedata.set(this.gamedata);
        LoopController.reboot();
        for (const loop of this.gamedata.loops.completed) {
            console.log('booted?');
            StoredLoopController.bootLoop(loop.increment);
        }
    }

    public save() {
        this.gamedata.meta.lastSavedAt = moment.now();
        localStorage.__tcsave = JSON.stringify(this.gamedata);
        gamedata.set(this.gamedata);
    }

}

export default initializeController<SaveController>(SaveController);