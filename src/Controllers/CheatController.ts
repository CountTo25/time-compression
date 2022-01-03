
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

class CheatController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'hooks', source: hooks},
    ];
    private gamedata!: Gamedata;

    public addTotal(amt: number = 100) {
        this.gamedata.cycles.current.totalData+=amt;
        gamedata.set(this.gamedata);
    }
}


const c = initializeController<CheatController>(CheatController);
export default c;