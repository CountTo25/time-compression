import { writable, Writable } from "svelte/store";

const tickers: Writable<Function[]> = writable([]);
export default tickers;

export function clearTickers() {
    tickers.set([]);
}

export function pushListener(_new: Function) {
    tickers.update(tickers => [...tickers, _new]);
}