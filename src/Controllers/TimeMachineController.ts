import events from "../Models/Events";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Log, logs, pushLog } from "../Storage/logs";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";

class TimeMachineController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'logs', source: logs}
    ];
    private gamedata!: Gamedata;
    private logs!: Log[];

    public getModifications() {

    }

    public buyModification() {
        
    }
}

export default initializeController<TimeMachineController>(TimeMachineController);