import events from "../Models/Events";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Log, logs, pushLog } from "../Storage/logs";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";

class DataController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
    ];
    private gamedata!: Gamedata;

    public awardData(baseline: number): number
    {
        this.gamedata.data.amount+=baseline;
        this.gamedata.loops.current.dataDelta+=baseline;
        gamedata.set(this.gamedata);
        return baseline;
    }
}

export default initializeController<DataController>(DataController);