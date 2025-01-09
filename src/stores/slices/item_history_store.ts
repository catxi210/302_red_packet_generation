import { ImageModel, ItemType, VideoModel } from "@/services/image";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface GeneratedItem {
  id: number;
  isSample: boolean;
  sampleType: "coverImageSample" | "coverVideoSample" | null;
  itemType: ItemType;
  imagePrompt: string;
  imageModel: ImageModel;
  imageUrl: string;
  videoPrompt: string;
  videoModel: VideoModel | null;
  videoUrl: string;
}
export interface ItemHistory {
  currentItem: GeneratedItem | null;
  items: GeneratedItem[];
}
const initialItemHistory: ItemHistory = {
  currentItem: null,
  items: [],
};

export const itemHistoryAtom = atomWithStorage<ItemHistory>(
  "item_history",
  initialItemHistory,
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

/**
 * Add red packet item history
 */
export const addItemHistory = atom(null, (get, set, newItem: GeneratedItem) => {
  set(itemHistoryAtom, {
    ...get(itemHistoryAtom),
    items: [newItem, ...get(itemHistoryAtom).items],
  });
});
/**
 * Whether there is a history of red packet items
 */
export const hasItemHistory = atom((get) => {
  return get(itemHistoryAtom).items.length > 0;
});
/**
 * Get red packet item history
 */
export const getItemHistory = atom((get) => {
  return get(itemHistoryAtom).items;
});
/**
 * Get current red packet item
 */
export const getCurrentItem = atom((get) => {
  return get(itemHistoryAtom).currentItem;
});
/**
 * Set current red packet item
 */
export const setCurrentItem = atom(null, (get, set, newItem: GeneratedItem) => {
  set(itemHistoryAtom, {
    ...get(itemHistoryAtom),
    currentItem: newItem,
  });
});
/**
 * Remove red packet item history
 */
export const removeItemHistory = atom(null, (get, set, itemId: number) => {
  set(itemHistoryAtom, {
    ...get(itemHistoryAtom),
    items: get(itemHistoryAtom).items.filter((item) => item.id !== itemId),
  });
});
