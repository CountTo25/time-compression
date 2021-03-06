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
            totalEvents: 0,
            consumedEvents: 0,
        },
        completed: [],
        maxCompleted: 3,
    },
    datasets: {amount: 0},
    cycles: {
        total: 0,
        current: {
            totalData: 0,
        }
    },

    knowledge: {
        buildings: {
            purchased: {},
            auto: [],
        }
    },

    timeMachine: {
        modifications: [],
    },

    data: {amount: 0},
    meta: {
        lastSavedAt: moment.now(),
        records: {
            longestLoop: 0,
            eventsPerLoop: 0,
            totalLoops: 0,
            totalEvents: 0,
        },
        totals: {
            loops: 0,
            datasets: 0,
        },
        triggers: [],
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

    datasets: {
        amount: number,
    }

    cycles: {
        total: number,
        current: {
            totalData: number,
        }
    },

    timeMachine: {
        modifications: string[]
    },
    knowledge: {
        buildings: {
            purchased: {[key: string]: number}
            auto: string[],
        }
    }

    meta: {
        lastSavedAt: number,
        records: {
            longestLoop: number,
            eventsPerLoop: number,
            totalLoops: number,
            totalEvents: number, //todo: total: {loops, events, datasets}
        }
        totals: {
            loops: number,
            datasets: number,
        }
        triggers: string[],
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
    totalEvents: number,
    consumedEvents: number,
    length: number,
    buildings: {
        [key: string]: number
    }
}

type StoredLoop = LoopData & {bakedIncome: number, duration: number}
type OccuredEvent = Event & {message: string}
type PlaybackEvent = {at: number, message: string, deltaData: number, consumed: boolean}