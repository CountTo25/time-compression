import type {Writable} from "svelte/store";

export abstract class Controller {
    protected wrapped: Record[] = [];

    private ____bindStorage() {
        this.wrapped.forEach(storage => {
            storage.source.subscribe(data => this[storage.key] = data);
        })
    }

    protected ____sync(name: string) {
        this.wrapped.find(w => w.key === name).source.set(this[name]);
    }
}


type Record = {key: string, source: Writable<any>};