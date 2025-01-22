import {
  editFormSchema,
  EditFormSchemaType,
} from "@/components/forms/tabs/schema";
import {
  getCoverPromptByLLM,
  getImageByFlux,
  getImageByDoubao,
  VideoModel,
  ItemType,
  ImageModel,
} from "@/services/image";
import {
  getKlingTask,
  getKlingTaskStatus,
  // getResizeVideo,
} from "@/services/video";
import { editFormAtom, initialEditForm } from "@/stores/slices/edit_form_store";
import {
  addItemHistory,
  GeneratedItem,
  setCurrentItem,
} from "@/stores/slices/item_history_store";
import { createScopedLogger } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePolling } from "../global/use-polling";
import { getPixVerseTask, getPixVerseTaskStatus } from "@/services/video";
import { store } from "@/stores";
import {
  clearPixVerseStatus,
  getPixVerseCurrentTaskId,
  updatePixVerseTaskId,
} from "@/stores/slices/pixverse_store";
import { setPolling } from "@/stores/slices/polling_store";
import {
  clearKlingStatus,
  getKlingCurrentTaskId,
  updateKlingTaskId,
} from "@/stores/slices/kling_store";

const GENERATING_IMAGE_TOAST_ID = "generating_image";
const GENERATING_VIDEO_TOAST_ID = "generating_video";
const logger = createScopedLogger("UseEditForm");

export function useEditForm() {
  const t = useTranslations("editTab.generation");

  const [storedForm, setStoredForm] = useAtom(editFormAtom);
  const _addItemHistory = useSetAtom(addItemHistory);
  const _setCurrentItem = useSetAtom(setCurrentItem);

  const [isGenerating, setIsGenerating] = useState(false);

  const hasAttemptedRestore = useRef(false);

  const {
    watch,
    register,
    setValue: setValueForm,
    setError,
    trigger,
    formState: { errors },
  } = useForm<EditFormSchemaType>({
    values: storedForm,
    resolver: zodResolver(editFormSchema, {
      errorMap: (error, ctx) => {
        logger.debug("Zod error:", error, ctx);

        return { message: error.message || "Validation error" };
      },
    }),
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: initialEditForm,
  });

  const { isPolling, start: startPixVersePolling } = usePolling(
    getPixVerseTaskStatus,
    {
      retryDelay: 10000,
      maxAttempts: 60,
      isComplete: (data) => data.data.state === "succeeded",
      isFailed: (data) => data.data.state === "failed",
      onSuccess: (data) => {
        const formData = watch();
        const {
          coverImagePrompt,
          coverVideoPrompt,
          coverImageModel,
          coverVideoModel,
          coverImageUrl,
          currentType,
        } = formData;

        const generatedItem: GeneratedItem = {
          id: Date.now(),
          isSample: false,
          sampleType: null,
          itemType: currentType as ItemType,
          imagePrompt: coverImagePrompt,
          imageModel: coverImageModel as ImageModel,
          imageUrl: coverImageUrl ?? "",
          videoPrompt: coverVideoPrompt,
          videoModel: coverVideoModel as VideoModel,
          videoUrl: data.data.video_url!,
        };

        _addItemHistory(generatedItem);
        _setCurrentItem(generatedItem);

        toast.dismiss(GENERATING_VIDEO_TOAST_ID);
        toast.success(t("generating_video_success"));

        store.set(clearPixVerseStatus);
        store.set(setPolling, false);

        logger.debug("Task successed:", data);
      },
      onError: (error: any) => {
        toast.dismiss(GENERATING_VIDEO_TOAST_ID);
        toast.error(t("generating_video_failed"));

        store.set(clearPixVerseStatus);
        store.set(setPolling, false);

        logger.error("Error polling video:", error);
      },
      onData: (data) => {
        toast.loading(t("generating_video"), {
          id: GENERATING_VIDEO_TOAST_ID,
        });

        store.set(updatePixVerseTaskId, data.data.task_id);
        store.set(setPolling, true);

        logger.debug("Task data:", data);
      },
    }
  );

  const { isPolling: isKlingPolling, start: startKlingPolling } = usePolling(
    getKlingTaskStatus,
    {
      retryDelay: 10000,
      maxAttempts: 60,
      isComplete: (data) => data.data.status === 99,
      isFailed: () => false,
      onSuccess: (data) => {
        const formData = watch();
        const {
          coverImagePrompt,
          coverVideoPrompt,
          coverImageModel,
          coverVideoModel,
          coverImageUrl,
          currentType,
        } = formData;

        const generatedItem: GeneratedItem = {
          id: Date.now(),
          isSample: false,
          sampleType: null,
          itemType: currentType as ItemType,
          imagePrompt: coverImagePrompt,
          imageModel: coverImageModel as ImageModel,
          imageUrl: coverImageUrl ?? "",
          videoPrompt: coverVideoPrompt,
          videoModel: coverVideoModel as VideoModel,
          videoUrl: data.data.works[0].resource.resource,
        };

        _addItemHistory(generatedItem);
        _setCurrentItem(generatedItem);

        toast.dismiss(GENERATING_VIDEO_TOAST_ID);
        toast.success(t("generating_video_success"));

        store.set(clearKlingStatus);
        store.set(setPolling, false);

        logger.debug("Task successed:", data);
      },
      onError: (error: any) => {
        store.set(clearKlingStatus);
        store.set(setPolling, false);

        toast.dismiss(GENERATING_VIDEO_TOAST_ID);
        toast.error(t("generating_video_failed"));

        logger.error("Error generating video:", error);
      },
      onData: (data) => {
        toast.loading(t("generating_video"), {
          id: GENERATING_VIDEO_TOAST_ID,
        });

        store.set(updateKlingTaskId, data.data.task.id);
        store.set(setPolling, true);

        logger.debug("Task data:", data);
      },
    }
  );

  const setValue = useCallback(
    (name: keyof EditFormSchemaType, value: any) => {
      logger.debug(name, value);
      setValueForm(name, value);
      setStoredForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setValueForm, setStoredForm]
  );

  const handleGenerate = async () => {
    const formData = watch();
    logger.debug("Current form data:", formData);

    const validationResult = editFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }));

      logger.debug(
        "Formatted validation errors:",
        JSON.stringify(formattedErrors, null, 2)
      );

      // Set errors
      formattedErrors.forEach((error) => {
        const field = error.path[error.path.length - 1];
        if (typeof field === "string") {
          setError(field as keyof EditFormSchemaType, {
            type: "custom",
            message: t(`errors.${error.path[0]}`),
          });
        }
      });

      // Focus on first error
      if (formattedErrors.length > 0) {
        const firstError = formattedErrors[0];
        const firstErrorField = firstError.path[firstError.path.length - 1];
        if (typeof firstErrorField === "string") {
          const errorElement = document.querySelector(
            `[name="${firstErrorField}"]`
          );
          logger.debug("First error field:", firstErrorField);
          if (errorElement instanceof HTMLElement) {
            errorElement.focus();
          }
        }
      }

      return;
    }

    const {
      currentType,
      coverImagePrompt,
      coverVideoPrompt,
      coverImageModel,
      coverVideoModel,
      coverImageUrl,
    } = formData;

    if (currentType === "coverImage") {
      setIsGenerating(true);

      toast.loading(t("generating_image"), {
        id: GENERATING_IMAGE_TOAST_ID,
      });

      try {
        let coverImage = "";

        if (coverImageModel === "Flux") {
          const llmPrompt = await getCoverPromptByLLM({
            prompt: coverImagePrompt,
          });

          coverImage = (
            await getImageByFlux({
              prompt: llmPrompt.output,
            })
          ).images[0].url;
        } else if (coverImageModel === "Doubao") {
          coverImage = (
            await getImageByDoubao({
              prompt: coverImagePrompt,
            })
          ).data.image_urls[0];
        }

        if (!coverImage) {
          throw new Error("Failed to generate image");
        }

        const generatedItem: GeneratedItem = {
          id: Date.now(),
          isSample: false,
          sampleType: null,
          itemType: "coverImage",
          imagePrompt: coverImagePrompt,
          imageModel: coverImageModel as ImageModel,
          imageUrl: coverImage,
          videoPrompt: coverImagePrompt,
          videoModel: null,
          videoUrl: "",
        };

        _addItemHistory(generatedItem);
        _setCurrentItem(generatedItem);

        toast.dismiss(GENERATING_IMAGE_TOAST_ID);
        toast.success(t("generating_image_success"));

        logger.debug("coverImage", coverImage);
      } catch (error: any) {
        toast.dismiss(GENERATING_IMAGE_TOAST_ID);
        toast.error(t("generating_image_failed"));

        logger.error("Error generating cover image:", error);
      } finally {
        setIsGenerating(false);
      }
    } else if (currentType === "coverVideo") {
      // avoid duplicate requests
      if (isPolling) {
        logger.debug("Already polling, skipping...");

        return;
      }

      toast.loading(t("generating_video"), {
        id: GENERATING_VIDEO_TOAST_ID,
      });

      store.set(setPolling, true);

      if (coverVideoModel === "PixVerse") {
        try {
          const task = await getPixVerseTask({
            prompt: coverVideoPrompt,
            image: coverImageUrl ?? "",
          });

          startPixVersePolling(task.data.task_id);

          logger.debug("Create a video task");
        } catch (error: any) {
          store.set(clearPixVerseStatus);
          store.set(setPolling, false);

          toast.dismiss(GENERATING_VIDEO_TOAST_ID);
          toast.error(t("generating_video_failed"));

          logger.error("Error generating video:", error);
        }
      } else if (coverVideoModel === "Kling") {
        try {
          const task = await getKlingTask({
            prompt: coverVideoPrompt,
            inputImage: coverImageUrl ?? "",
          });

          startKlingPolling(task.data.task.id);

          logger.debug("Create a video task");
        } catch (error: any) {
          store.set(clearKlingStatus);
          store.set(setPolling, false);

          toast.dismiss(GENERATING_VIDEO_TOAST_ID);
          toast.error(t("generating_video_failed"));

          logger.error("Error generating video:", error);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (!hasAttemptedRestore.current) {
      const storedTaskId = store.get(getPixVerseCurrentTaskId);
      const storedKlingTaskId = store.get(getKlingCurrentTaskId);

      if (storedTaskId) {
        if (!isPolling) {
          try {
            startPixVersePolling(storedTaskId);

            logger.debug(
              "Attempting to restore polling for task:",
              storedTaskId
            );
            hasAttemptedRestore.current = true;

            return;
          } catch (error) {
            logger.error("Error restoring video polling:", error);
          }
        }
      }

      if (storedKlingTaskId) {
        if (!isKlingPolling) {
          try {
            startKlingPolling(storedKlingTaskId);

            logger.debug(
              "Attempting to restore polling for task:",
              storedKlingTaskId
            );
            hasAttemptedRestore.current = true;

            return;
          } catch (error) {
            logger.error("Error restoring video polling:", error);
          }
        }
      }
    }
  }, [startPixVersePolling, isPolling, startKlingPolling, isKlingPolling]);

  return {
    watch,
    register,
    setValue,
    setError,
    trigger,
    errors,
    handleGenerate,
    isGenerating,
    isPolling,
    isKlingPolling,
  };
}
