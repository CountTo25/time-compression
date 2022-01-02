import { Writable, writable } from "svelte/store";

export const logs: Writable<Log[]> = writable([]);


export type Log = {
    text: string,
    timestamp: number,
}

export function pushLog(text: string, timestamp: number) {
    logs.update(logs => {
        if (logs.length >= 5) {
            logs.pop();
        }
        logs.unshift({text, timestamp});
        return logs;
    })
}