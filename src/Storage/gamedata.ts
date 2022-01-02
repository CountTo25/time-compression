import { writable, Writable } from "svelte/store";

export const gamedata: Writable<Gamedata> = writable({
    events: {
        capacity: 10,
        stored: [],
    },

    loops: {
        current: {
            fresh: true,
            paused: false,
            dataDelta: 0,
            running: false,
            progress: {
                time: 0,
                next: 0,
            },
            length: 0,
            events: [],
            recorded: [],
            buildings: {},
        },
        completed: [],
    },

    data: {
        amount: 0,
    }
});


export type Gamedata = {
    events: {
        capacity: number,
        stored: OccuredEvent[],
    }

    loops: {
        current: {
            fresh: boolean,
            paused: boolean,
            dataDelta: number,
            running: boolean,
            progress: {
                time: number,
                next: number,
            },
            recorded: PlaybackEvent[],
            events: Event[],
            length: number,
            buildings: {
                [key: string]: number
            }
        },
        completed: [],
    },

    


    data: {
        amount: number,
    }
}

type Event = {
    occursAt: number,
    payload: string,
}

type OccuredEvent = Event & {message: string}
type PlaybackEvent = {at: number, message: string, deltaData: number, consumed: boolean}