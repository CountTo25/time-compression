import type { Gamedata } from "../Storage/gamedata";
import Pipeline from "./Pipeline";

export default class IncomePipeline extends Pipeline
{
    //public work()

    public income!: number; 
    private members: Pipeable[] = [];
    public gamedata!: Readonly<Gamedata>;

    public pushMember(_new: Pipeable) {
        this.beforePush(_new);
        this.members.push(_new);
        this.afterPush(_new);
    }

    public run(income: number, gamedata: Gamedata): number {
        this.income = income;
        this.gamedata = gamedata;
        for (const pipe of this.members) {
            pipe(this);
        }
        return this.income;
    }

    public beforePush(_new: Pipeable) {

    }

    public afterPush(_new: Pipeable) {

    }
}

type EventDispatchPipeWorker = (number) => number
type Pipeable = (_new: IncomePipeline) => IncomePipeline