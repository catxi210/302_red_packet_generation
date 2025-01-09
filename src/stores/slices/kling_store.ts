import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { KlingTaskResponse } from "@/services/video";

export const initialKlingStatus: KlingTaskResponse = {
  message: "",
  status: 0,
  result: 0,
  timestamp: [],
  data: {
    message: "",
    status: 0,
    limitation: {
      type: "",
      limit: 0,
      remaining: 0,
    },
    task: {
      createTime: 0,
      deleted: false,
      favored: false,
      id: "",
      status: 0,
      taskInfo: {
        arguments: [],
        extraArgs: {},
        inputs: [],
        type: "",
      },
      type: "",
      updateTime: 0,
      viewTime: 0,
      viewed: false,
    },
    userTickets: {
      ticket: [],
    },
    works: [],
  },
};

export const klingStatusAtom = atomWithStorage<KlingTaskResponse>(
  "kling_status_store",
  initialKlingStatus,
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

export const getKlingCurrentTaskId = atom(
  (get) => get(klingStatusAtom).data.task.id
);

export const setKlingStatus = atom(
  null,
  (_get, set, status: KlingTaskResponse) => {
    set(klingStatusAtom, status);
  }
);

export const updateKlingTaskId = atom(null, (_get, set, taskId: string) => {
  set(klingStatusAtom, (state) => ({
    ...state,
    taskId,
  }));
});

export const clearKlingStatus = atom(null, (_get, set) => {
  set(klingStatusAtom, initialKlingStatus);
});
