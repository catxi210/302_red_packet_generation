/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import coverBottom from "@/assets/images/cover_bottom.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MdOutlineDownload } from "react-icons/md";
import { MdOutlineDownloading } from "react-icons/md";
import { Button } from "../ui/button";
import { LoaderRenderer } from "../common/loader-renderer";
import { toast } from "sonner";
import { createScopedLogger } from "@/utils";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { GLOBAL } from "@/constants";

interface ImagePreviewProps {
  className?: string;
  source: string;
}

const logger = createScopedLogger("ImagePreview");

export default function ImagePreview({ className, source }: ImagePreviewProps) {
  const t = useTranslations("editTab.image_preview");

  const { handleDownload } = useMonitorMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCoverImage = () => {
    if (!source) {
      logger.error("No current cover image");
      return;
    }

    setIsDownloading(true);

    const promise = handleDownload(
      source,
      `${t("download.image_name") + new Date().getTime()}.png`,
      () => {
        setIsDownloading(false);
      }
    );

    toast.promise(promise, {
      loading: t("download.downloading"),
      success: t("download.download_success"),
      error: t("download.download_failed"),
    });

    logger.debug("Download cover image success");
  };

  return (
    <div className={cn("container", className)}>
      <p className="text-center text-sm text-gray-500">{t("label")}</p>
      <div className="relative aspect-[240/397] h-auto min-w-[240px] transition-all duration-300 ease-in-out max-md:min-w-[150px]">
        {(isLoading || !source) && (
          <div className="placeholder absolute inset-0 rounded-md bg-gray-300 max-md:rounded-sm">
            {(isLoading || !source) && (
              <div className="placeholder absolute inset-0 flex flex-col items-center justify-center rounded-md bg-gray-300 max-md:rounded-sm">
                <p className="mt-24 text-center text-sm text-gray-500 max-md:mt-20">
                  {t("placeholder")}
                </p>
              </div>
            )}
          </div>
        )}
        {source && (
          <img
            className="absolute inset-0 h-auto w-full rounded-md object-contain max-md:rounded-sm"
            src={source}
            alt={t("image")}
            width={GLOBAL.COVER_IMAGE_SIZE.WIDTH}
            height={GLOBAL.COVER_IMAGE_SIZE.HEIGHT}
            onLoad={() => setIsLoading(false)}
          />
        )}
        <Image
          className="absolute bottom-0 left-0 h-auto w-full object-contain"
          src={coverBottom}
          alt={t("cover_bottom")}
          priority
        />
        {!isLoading && source && (
          <Button
            className="absolute bottom-2 right-2 bg-transparent shadow-none hover:bg-transparent/20"
            type="button"
            size="icon"
            variant="icon"
            onClick={handleDownloadCoverImage}
            disabled={isDownloading}
          >
            <LoaderRenderer
              status={isDownloading ? "downloading" : "idle"}
              statuses={{
                downloading: {
                  icon: <MdOutlineDownloading className="!size-8" />,
                },
                idle: {
                  icon: <MdOutlineDownload className="!size-8" />,
                },
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
