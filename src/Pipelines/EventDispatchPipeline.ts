export default class EventDispatchPipeline {
    //public work()

    private members: EventDispatchPipeWorker[] = [];

    public build(from: EventDispatchPipeWorker[]): this
    {
        this.members = from;   
        return this;
    }

    public run(diff: number): number {
        for (const pipe of this.members) {
            diff = pipe(diff)
        }
        return diff;
    }
}

type EventDispatchPipeWorker = (number) => number