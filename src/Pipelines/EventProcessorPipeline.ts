import Pipeline from "./Pipeline";

export default class EventProcessorPipeline extends Pipeline
{
    //public work()

    public diff!: number; 
    private members: Pipeable[] = [];
    public pushMember(_new: Pipeable) {
        this.members.push(_new);
    }

    public run(diff: number): number {
        this.diff = diff;
        for (const pipe of this.members) {
            pipe(this);
        }
        return this.diff;
    }
}

type EventDispatchPipeWorker = (number) => number
type Pipeable = (_new: EventProcessorPipeline) => EventProcessorPipeline