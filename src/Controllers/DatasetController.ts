
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

    public getDataToNext() {
        const current = this.getNextResetDatasets();
        let total = 0;
        for (let i = 0; i < current + 1; i++) {
            total+= Math.floor((150 * (i + 1)) * (1.1 ** (i + 1)));
        }
        return total;
    }

    public getNextResetDatasets(): number 
    {
        return this.datasetFormula(this.gamedata.cycles.current.totalData);
    }

    private datasetFormula(from: number) {
        let calc = from;
        let sets = 0;
        while (calc > 0) {
            calc-= Math.floor((150 * (sets+1)) * (1.1 ** (sets+1)));
            sets++;
        }
        if (sets > 0) {sets--} //TOOD: elegant
        return sets;
    }
}

export default initializeController<SaveController>(SaveController);