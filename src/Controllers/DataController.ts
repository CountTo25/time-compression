import buildings from "../Models/Buildings";
import events from "../Models/Events";
import IncomePipeline from "../Pipelines/IncomePipeline";
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

        const buildings = this.getOwnedBuildings();
        const pipeline = new IncomePipeline();
        for (const building of buildings) {
            if (building.turnsOnAt === IncomePipeline) {
                pipeline.pushMember(building.effect);
            }
        }
        value.value = pipeline.run(value.value, this.gamedata);

        this.gamedata.data.amount+=value.value;
        this.gamedata.loops.current.dataDelta+=value.value;
        this.gamedata.cycles.current.totalData+=value.value;
        gamedata.set(this.gamedata);
        return value.value;
    }

    public getOwnedBuildings() {
        return buildings.filter(b => Object.keys(this.gamedata.loops.current.buildings).includes(b.name));
    }

    public purchaseBuilding(ref: string): void
    {
        const building = buildings.find(b => 
            b.name === ref
            && (b.condition(this.gamedata))
        );
        if (!building) {console.log('no such building'); return;}
        if (this.gamedata.data.amount < building.price) {return;} //todo popups
        if (building.onetime && (building.name in this.gamedata.loops.current.buildings)) {return;}
        this.gamedata.data.amount -= building.price;
        
        if (!(building.name in this.gamedata.loops.current.buildings)) {
            this.gamedata.loops.current.buildings[building.name] = 0;
        }

        this.gamedata.loops.current.buildings[building.name]++;
        if (!(building.name in this.gamedata.knowledge.buildings.purchased)) {
            this.gamedata.knowledge.buildings.purchased[building.name] = 0;
        }

        this.gamedata.knowledge.buildings.purchased[building.name]++;
        if ('onActive' in building && building.onActive !== null) {
            building.onActive();
        }
        gamedata.set(this.gamedata);
    }

    public getPurchaseableBuildings() {
        return buildings.filter(b => (!b.onetime ? true : !(b.name in this.gamedata.loops.current.buildings)) && b.unlocksAt(this.gamedata));
    }
}

export default initializeController<DataController>(DataController);