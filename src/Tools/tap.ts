import type { Writable } from "svelte/store";

class Tap<T>{
    private tapped: Writable<T>;
    constructor (tapped: Writable<T>) {
        this.tapped = tapped;
    }

    public and(action: (a: T) => void) {
        this.tapped.update(r => {action(r); return r;});
    }
}


export function tap<T>(store: Writable<T>) {
    return new Tap(store);
}

//tap(user).then(user = > {});