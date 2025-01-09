import { createJSONStorage } from "jotai/utils";
import { EditFormSchemaType } from "@/components/forms/tabs/schema";
import { atomWithStorage } from "jotai/utils";

export const initialEditForm: EditFormSchemaType = {
  currentType: "coverImage",
  coverImagePrompt: "",
  coverImageModel: "Doubao",
  coverImageUrl: "",
  coverVideoPrompt: "",
  coverVideoModel: "PixVerse",
};

export const editFormAtom = atomWithStorage<EditFormSchemaType>(
  "edit_form",
  initialEditForm,
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
