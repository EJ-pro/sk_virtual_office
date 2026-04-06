import { writable } from "svelte/store";

export type DuelStatus = "IDLE" | "WAITING_ACCEPT" | "RECEIVED_REQUEST" | "DUELING" | "FINISHED";

export interface DuelState {
    status: DuelStatus;
    opponentId: number | null;
    opponentName: string | null;
    myHits: number;
    opponentHits: number;
    winnerName: string | null;
}

const initialState: DuelState = {
    status: "IDLE",
    opponentId: null,
    opponentName: null,
    myHits: 0,
    opponentHits: 0,
    winnerName: null
};

function createDuelStore() {
    const { subscribe, set, update } = writable<DuelState>(initialState);

    return {
        subscribe,
        requestDuel(id: number, name: string) {
            update(state => ({ ...state, status: "WAITING_ACCEPT", opponentId: id, opponentName: name }));
        },
        receiveRequest(id: number, name: string) {
            update(state => ({ ...state, status: "RECEIVED_REQUEST", opponentId: id, opponentName: name }));
        },
        startDuel() {
            update(state => ({ ...state, status: "DUELING", myHits: 0, opponentHits: 0 }));
        },
        addMyHit() {
            update(state => {
                const newHits = state.myHits + 1;
                if (newHits >= 5) {
                    return { ...state, status: "FINISHED", myHits: newHits, winnerName: state.opponentName };
                }
                return { ...state, myHits: newHits };
            });
        },
        addOpponentHit() {
            update(state => {
                const newHits = state.opponentHits + 1;
                if (newHits >= 5) {
                    return { ...state, status: "FINISHED", opponentHits: newHits, winnerName: "Me" }; // "Me" will be replaced by actual name in UI
                }
                return { ...state, opponentHits: newHits };
            });
        },
        cancelOrEnd() {
            set(initialState);
        }
    };
}

export const duelStore = createDuelStore();
