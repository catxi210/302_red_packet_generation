import { EditFormSchemaType } from "@/components/forms/tabs/schema";
import { createScopedLogger } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

const logger = createScopedLogger("usePromptSync");

type PromptType = "coverImage" | "coverVideo";
type PromptKeys = "imagePrompt" | "videoPrompt";
type FormKeys = "coverImagePrompt" | "coverVideoPrompt";

interface PromptConfig {
  promptKey: PromptKeys;
  formKey: FormKeys;
  lastPrompt: string | null;
  setLastPrompt: (value: string | null) => void;
}

interface CurrentItem {
  itemType: string;
  imagePrompt: string | null;
  videoPrompt: string | null;
}

interface UsePromptSyncProps {
  currentItem: CurrentItem | null;
  setValue: (name: keyof EditFormSchemaType, value: any) => void;
}

export function usePromptSync({ currentItem, setValue }: UsePromptSyncProps) {
  const [lastImagePrompt, setLastImagePrompt] = useState<string | null>(null);
  const [lastVideoPrompt, setLastVideoPrompt] = useState<string | null>(null);

  const promptConfigs = useMemo<Record<PromptType, PromptConfig>>(
    () => ({
      coverImage: {
        promptKey: "imagePrompt",
        formKey: "coverImagePrompt",
        lastPrompt: lastImagePrompt,
        setLastPrompt: setLastImagePrompt,
      },
      coverVideo: {
        promptKey: "videoPrompt",
        formKey: "coverVideoPrompt",
        lastPrompt: lastVideoPrompt,
        setLastPrompt: setLastVideoPrompt,
      },
    }),
    [lastImagePrompt, lastVideoPrompt]
  );

  const updatePromptValue = useCallback(
    (
      formKey: FormKeys,
      newPrompt: string | null,
      setLastPrompt: (value: string | null) => void
    ) => {
      setValue(formKey, newPrompt);
      setLastPrompt(newPrompt);

      logger.debug(`Set ${formKey}`, newPrompt);
    },
    [setValue]
  );

  useEffect(() => {
    if (!currentItem) return;

    const { itemType } = currentItem;
    const config = promptConfigs[itemType as PromptType];
    if (!config) return;

    if (itemType === "coverVideo") {
      const { videoPrompt, imagePrompt } = currentItem;

      if (videoPrompt !== lastVideoPrompt) {
        updatePromptValue("coverVideoPrompt", videoPrompt, setLastVideoPrompt);
      }
      if (imagePrompt !== lastImagePrompt) {
        updatePromptValue("coverImagePrompt", imagePrompt, setLastImagePrompt);
      }

      return;
    }

    const { promptKey, formKey, lastPrompt, setLastPrompt } = config;
    const newPrompt = currentItem[promptKey];

    if (newPrompt !== lastPrompt) {
      updatePromptValue("coverVideoPrompt", "", setLastVideoPrompt);
      updatePromptValue(formKey, newPrompt, setLastPrompt);
    }
  }, [
    currentItem,
    promptConfigs,
    lastVideoPrompt,
    lastImagePrompt,
    updatePromptValue,
  ]);

  return {
    lastImagePrompt,
    lastVideoPrompt,
  };
}
