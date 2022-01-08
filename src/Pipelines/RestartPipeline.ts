import type { Gamedata } from "../Storage/gamedata";
import Pipeline from "./Pipeline";

export default class RestartPipeline extends Pipeline
{
    //public work()

    public startingData: number = 0;
    private members: Pipeable[] = [];

    public pushMember(_new: Pipeable): void
    {
        this.beforePush(_new);
        this.members.push(_new);
        this.afterPush(_new);
    }

    public run(startingData: number = 0): this
    {
        this.startingData = startingData;
        for (const pipe of this.members) {
            pipe(this);
        }
        return this;
    }

    public beforePush(_new: Pipeable) {

    }

    public afterPush(_new: Pipeable) {

    }
}

type EventDispatchPipeWorker = (number) => number
type Pipeable = (_new: RestartPipeline) => RestartPipeline