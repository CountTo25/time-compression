import { Writable, writable } from "svelte/store";

export const toRender: Writable<number[]> = writable([]);