import buildings from "../Models/Buildings";
import events from "../Models/Events";
import { Gamedata, gamedata } from "../Storage/gamedata";
import { Log, logs, pushLog } from "../Storage/logs";
import { Hooks, hooks } from "../Storage/loopHooks";
import initializeController from "../Tools/initializeController";
import { Controller } from "./Support/Controller";

class DataController extends Controller {
    protected wrapped = [
        {key: 'gamedata', source: gamedata},
        {key: 'hooks', source: hooks},
    ];
    private gamedata!: Gamedata;
    private hooks!: Hooks;

    public awardData(amount: number, muteHooks: boolean = false): number
    {   
        let value = {value: amount};
        if (!muteHooks) {
            for (const hook of this.hooks.onIncome) {
                hook(this.gamedata, value);
            }
        }
        this.gamedata.data.amount+=value.value;
        this.gamedata.loops.current.dataDelta+=value.value;
        this.gamedata.cycles.current.totalData+=value.value;
        gamedata.set(this.gamedata);
        return value.value;
    }

    public purchaseBuilding(ref: string): void
    {
        const building = buildings.filter(b => b.name === ref && (b.unlocksAt(this.gamedata) && b.name in this.gamedata.knowledge.buildings.purchased))[0]
        if (!building) {return;}
        if (this.gamedata.data.amount < building.price) {return;} //todo popups
        if (building.onetime && (building.name in this.gamedata.loops.current.buildings)) {return;}
        //if (!building.unlocksAt(this.gamedata)) {return;}
        this.gamedata.data.amount -= building.price;
        if (!(building.name in this.gamedata.loops.current.buildings)) {
            this.gamedata.loops.current.buildings[building.name] = 0;
        }
        this.gamedata.loops.current.buildings[building.name]++;
        if (!(building.name in this.gamedata.knowledge.buildings.purchased)) {
            this.gamedata.knowledge.buildings.purchased[building.name] = 0;
        }
        this.gamedata.knowledge.buildings.purchased[building.name]++;
        building.onActive();
        gamedata.set(this.gamedata);
    }

    public getPurchaseableBuildings() {
        return buildings.filter(b => (!b.onetime ? true : !(b.name in this.gamedata.loops.current.buildings)) && b.unlocksAt(this.gamedata));
    }
}

export default initializeController<DataController>(DataController);