import moment from "moment";
import { writable, Writable } from "svelte/store";

export const gamedata: Writable<Gamedata> = writable({
    events: {
        capacity: 5,
        stored: [],
    },

    loops: {
        current: {
            increment: 1,
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
        maxCompleted: 3,
    },

    data: {
        amount: 0,
    },
    meta: {
        lastSavedAt: moment.now(),
        records: {
            longestLoop: 0,
            eventsPerLoop: 0,
        }
    }
});


export type Gamedata = {
    events: {
        capacity: number,
        stored: OccuredEvent[],
    }

    loops: {
        current: LoopData,
        completed: StoredLoop[],
        maxCompleted: number,
    },

    data: {
        amount: number,
    },

    meta: {
        lastSavedAt: number,
    }
}

type Event = {
    occursAt: number,
    payload: string,
}

type LoopData = {
    increment: number,
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
}

type StoredLoop = LoopData & {bakedIncome: number, duration: number}

type OccuredEvent = Event & {message: string}
type PlaybackEvent = {at: number, message: string, deltaData: number, consumed: boolean}