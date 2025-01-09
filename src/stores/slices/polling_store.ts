import { atom } from "jotai";

export const pollingAtom = atom(false);

export const setPolling = atom(null, (_get, set, polling: boolean) => {
  set(pollingAtom, polling);
});
