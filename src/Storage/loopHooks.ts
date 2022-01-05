import { writable, Writable } from "svelte/store";
import type { Gamedata } from "./gamedata";

export const empty: Hooks = {
    onEventRoll: [],
    onIncome: [],
    onEventConsumed : [],
};

export const hooks: Writable<Hooks> = writable(empty);

export type Hooks = {
    onEventRoll: ((gd: Gamedata, {occursAt: number}, now: number) => void)[],
    onIncome: ((gd: Gamedata, {value: number}) => void)[],
    onEventConsumed: ((gd: Gamedata) => void)[],
}