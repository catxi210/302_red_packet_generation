import ImagePreview from "@/components/bussiness/image-preview";
import VideoPreview from "@/components/bussiness/video-preview";
import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { useEditForm } from "@/hooks/forms/use-edit-form";
import { getCurrentItem } from "@/stores/slices/item_history_store";
import { createScopedLogger } from "@/utils";
import { useAtomValue } from "jotai";
import { Loader2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { TbHandFingerRight } from "react-icons/tb";
// import { usePromptSync } from "@/hooks/forms/use-prompt-sync";
import { GLOBAL } from "@/constants";
import { useEffect, useMemo } from "react";
import { pollingAtom } from "@/stores/slices/polling_store";

const logger = createScopedLogger("EditTabForm");

export default function EditTabForm() {
  const t = useTranslations("editTab.form");

  const defaultItem = useMemo(
    () => ({
      ...GLOBAL.COVER_DEFAULT_SAMPLE,
      imagePrompt: t("default_sample.image_prompt"),
      videoPrompt: t("default_sample.video_prompt"),
    }),
    [t]
  );

  const currentItem = useAtomValue(getCurrentItem) ?? defaultItem;
  const isPolling = useAtomValue(pollingAtom);

  const { handleGenerate, isGenerating, watch, register, setValue, errors } =
    useEditForm();

  useEffect(() => {
    if (!currentItem) return;

    const {
      itemType,
      imageModel,
      videoModel,
      imageUrl,
      imagePrompt,
      videoPrompt,
    } = currentItem;

    setValue("currentType", itemType);
    setValue("coverImageUrl", imageUrl);
    setValue("coverImagePrompt", imagePrompt);
    setValue("coverVideoPrompt", videoPrompt);
    setValue("coverImageModel", imageModel ?? "Doubao");
    setValue("coverVideoModel", videoModel ?? "PixVerse");

    logger.debug("currentItem", currentItem);
  }, [currentItem, setValue]);

  return (
    <div className="flex w-full flex-row gap-12 max-lg:gap-2 max-md:flex-col">
      <div className="preview-container flex flex-row justify-center gap-12 max-lg:gap-2">
        <ImagePreview source={currentItem?.imageUrl ?? ""} />
        <VideoPreview source={currentItem?.videoUrl ?? ""} />
      </div>

      <form className="form-container flex h-full flex-1 flex-col gap-y-4">
        <div className="flex flex-col gap-4 pt-5 max-md:pt-0">
          <div className="prompt-textarea-group">
            <FormGenerator
              id="cover-image-prompt"
              name="coverImagePrompt"
              inputType="textarea"
              textareaConfig={{
                wrapperClassName:
                  watch("currentType") === "coverImage"
                    ? "h-[150px] [&:focus-within]:outline-red-600"
                    : "hidden",
              }}
              placeholder={t("cover_prompt.placeholder")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
              disabled={isPolling}
            />

            <FormGenerator
              id="cover-video-prompt"
              name="coverVideoPrompt"
              inputType="textarea"
              textareaConfig={{
                wrapperClassName:
                  watch("currentType") === "coverVideo"
                    ? "h-[150px] [&:focus-within]:outline-red-600"
                    : "hidden",
              }}
              placeholder={t("cover_prompt.video_prompt.placeholder")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
              disabled={isPolling}
            />
          </div>

          <div className="flex flex-row justify-between gap-4">
            <div className="select-group flex flex-row gap-2">
              <FormGenerator
                id="current-type"
                name="currentType"
                inputType="select"
                options={GLOBAL.COVER_TYPE_VALUES.SUPPORTED.map((item) => ({
                  label: t(item.label),
                  value: item.value,
                  id: item.id,
                }))}
                placeholder={t("cover_type_select.cover_image")}
                defaultValue={currentItem?.itemType ?? "coverImage"}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
                disabled={isPolling}
              />

              <FormGenerator
                className={
                  watch("currentType") === "coverImage" ? "" : "hidden"
                }
                id="cover-image-model"
                name="coverImageModel"
                inputType="select"
                options={GLOBAL.COVER_IMAGE_MODEL_VALUES.SUPPORTED.map(
                  (item) => ({
                    label: t(item.label),
                    value: item.value,
                    id: item.id,
                  })
                )}
                placeholder={t("cover_image_model_select.doubao")}
                defaultValue={currentItem?.imageModel ?? "Doubao"}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
                disabled={isPolling}
              />

              <FormGenerator
                className={
                  watch("currentType") === "coverVideo" ? "" : "hidden"
                }
                id="cover-video-model"
                name="coverVideoModel"
                inputType="select"
                options={GLOBAL.COVER_VIDEO_MODEL_VALUES.SUPPORTED.map(
                  (item) => ({
                    label: t(item.label),
                    value: item.value,
                    id: item.id,
                  })
                )}
                placeholder={t("cover_video_model_select.PixVerse")}
                defaultValue={currentItem?.videoModel ?? "PixVerse"}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
                disabled={isPolling}
              />
            </div>

            <Button
              className="bg-red-700 hover:bg-red-800"
              type="button"
              size="sm"
              onClick={handleGenerate}
              disabled={isPolling || isGenerating}
            >
              <LoaderRenderer
                status={isPolling || isGenerating ? "generating" : "idle"}
                statuses={{
                  generating: {
                    icon: <Loader2 className="h-4 w-4 animate-spin" />,
                    text: t("cover_prompt.action_loading_label"),
                  },
                  idle: {
                    icon: <RotateCcw className="h-4 w-4" />,
                    text: t("cover_prompt.action_label"),
                  },
                }}
              />
            </Button>
          </div>
        </div>

        <div className="self-end text-sm text-gray-500 transition-all duration-300 ease-in-out">
          {t("cover_prompt.note.main")}
          <a
            href="https://cover.weixin.qq.com/#/doc?page=register&index=0"
            className="inline-flex items-center text-red-700 hover:text-red-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cover_prompt.note.suffix")}
            <TbHandFingerRight className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
          </a>
        </div>
      </form>
    </div>
  );
}
