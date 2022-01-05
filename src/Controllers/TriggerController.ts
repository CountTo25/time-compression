
import { Gamedata, gamedata } from "../Storage/gamedata";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";


class TriggerController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
    ];
    private gamedata!: Gamedata;

    public try(trigger: string, or: (gd: Gamedata) => boolean): boolean {
        if (this.gamedata.meta.triggers.includes(trigger)) {return true}
        const res = or(this.gamedata);
        if (!res) {return false}
        this.gamedata.meta.triggers.push(trigger);
        this.____sync('gamedata');
        return true;
    }

    public set(trigger: string) {
        if (this.gamedata.meta.triggers.includes(trigger)) {return;}
        this.gamedata.meta.triggers.push(trigger);
    }
}


const c = initializeController<TriggerController>(TriggerController);
export default c;