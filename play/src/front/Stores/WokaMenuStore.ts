import type { ComponentType } from "svelte";
import { writable } from "svelte/store";
import { v4 } from "uuid";

export type WokaMenuAction = {
    uuid?: string;
    actionName: string;
    callback: () => void;
    protected?: boolean;
    priority?: number;
    style?: "is-success" | "is-error" | "is-primary" | string;
    actionIcon?: string | ComponentType;
    testId?: string;
};
export interface WokaMenuData {
    wokaName: string;
    actions: WokaMenuAction[];
    visitCardUrl?: string;
    userId: number; // -1 if the user is not found yet and woka menu is in progress
    userUuid: string;
}

function createWokaMenuStore() {
    const { subscribe, update, set } = writable<WokaMenuData | undefined>(undefined);

    return {
        subscribe,
        initialize: (wokaName: string, userId: number, userUuid: string, visitCardUrl: string | undefined) => {
            set({
                wokaName,
                actions: new Array<WokaMenuAction>(),
                visitCardUrl,
                userId,
                userUuid,
            });
        },
        addAction: (action: WokaMenuAction) => {
            update((data) => {
                if (data === undefined) return data;

                const dataWithUuid = { ...action, uuid: action.uuid ?? v4() };
                return {
                    ...data,
                    actions: [...data.actions, dataWithUuid]
                };
            });
        },
        removeAction: (actionName: string) => {
            update((data) => {
                if (!data) return data;
                return {
                    ...data,
                    actions: data.actions.filter(action => action.actionName !== actionName)
                };
            });
        },
        /**
         * Hides menu
         */
        clear: () => {
            set(undefined);
        },
        removeRemotePlayer: (userUuid: string) => {
            update((data) => {
                if (!data) return data;
                if (data.userUuid === userUuid) {
                    return undefined;
                }
                return data;
            });
        },
    };
}

export const wokaMenuStore = createWokaMenuStore();

export const wokaMenuProgressStore = writable<
    | {
          progress: number;
          message: string;
      }
    | undefined
>(undefined);
