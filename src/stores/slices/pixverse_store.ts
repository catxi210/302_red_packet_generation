import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface IPixVerseStatus {
  createTime: string;
  imageUrl: string;
  msg: string | null;
  point: string;
  poster: string;
  prompt: string;
  refund: string;
  state: string;
  status: string;
  taskId: string;
  updateTime: string;
  videoUrl: string;
}

export const initialPixVerseStatus: IPixVerseStatus = {
  createTime: "",
  imageUrl: "",
  msg: "",
  point: "",
  poster: "",
  prompt: "",
  refund: "",
  state: "",
  status: "",
  taskId: "",
  updateTime: "",
  videoUrl: "",
};

export const pixVerseStatusAtom = atomWithStorage<IPixVerseStatus>(
  "pixverse_status_store",
  initialPixVerseStatus,
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? localStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  {
    getOnInit: true,
  }
);

export const getPixVerseCurrentTaskId = atom(
  (get) => get(pixVerseStatusAtom).taskId
);

export const setPixVerseStatus = atom(
  null,
  (_get, set, status: IPixVerseStatus) => {
    set(pixVerseStatusAtom, status);
  }
);

export const updatePixVerseTaskId = atom(null, (_get, set, taskId: string) => {
  set(pixVerseStatusAtom, (state) => ({
    ...state,
    taskId,
  }));
});

export const clearPixVerseStatus = atom(null, (_get, set) => {
  set(pixVerseStatusAtom, initialPixVerseStatus);
});
