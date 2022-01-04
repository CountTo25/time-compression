
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

class DatabaseController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
    ];
    private gamedata!: Gamedata;

    public toggleAuto(building: string) {
        if (!(building in this.gamedata.knowledge.buildings.purchased)) {return;}
        if (this.gamedata.knowledge.buildings.purchased[building] < buildings.find(b => b.name === building).toAuto) {return;}
        if (this.gamedata.knowledge.buildings.auto.includes(building)) {
            const index = this.gamedata.knowledge.buildings.auto.indexOf(building);
            this.gamedata.knowledge.buildings.auto.splice(index, 1);
        } else {
            this.gamedata.knowledge.buildings.auto.push(building);
        }
        this.____sync('gamedata');
    }
}


const c = initializeController<DatabaseController>(DatabaseController);
export default c;