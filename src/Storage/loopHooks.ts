import { writable, Writable } from "svelte/store";
import type { Gamedata } from "./gamedata";

export const empty = {
    onEventRoll: [],
    onIncome: [],
};

export const hooks: Writable<Hooks> = writable(empty);

export type Hooks = {
    onEventRoll: ((gd: Gamedata, {occursAt: number}) => void)[],
    onIncome: ((gd: Gamedata, {value: number}) => void)[],
}