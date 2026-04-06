import { writable } from "svelte/store";

export const mailboxVisibleStore = writable<boolean>(false);

export function openMailbox() {
    mailboxVisibleStore.set(true);
}

export function closeMailbox() {
    mailboxVisibleStore.set(false);
}
