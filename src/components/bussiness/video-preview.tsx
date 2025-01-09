import { useTranslations } from "next-intl";
import coverBottom from "@/assets/images/cover_bottom.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { MdOutlineDownload, MdOutlineDownloading } from "react-icons/md";
import { Button } from "../ui/button";
import { LoaderRenderer } from "../common/loader-renderer";
import { toast } from "sonner";
import { createScopedLogger } from "@/utils";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import videoPlaceholder from "@/assets/svgs/video_placeholder.svg";

/*bg-[#f35543]*/

interface VideoPreviewProps {
  className?: string;
  source: string;
}

const logger = createScopedLogger("VideoPreview");

export default function VideoPreview({ className, source }: VideoPreviewProps) {
  const t = useTranslations("editTab.video_preview");

  const { handleDownload } = useMonitorMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // only change source will not trigger video load new video
  // so we need to use useEffect to trigger
  useEffect(() => {
    if (videoRef.current && source) {
      videoRef.current.load();
      setIsLoading(true);
    }
  }, [source]);

  const handleDownloadCoverVideo = () => {
    if (!source) {
      logger.error("No current cover image");
      return;
    }

    setIsDownloading(true);

    const promise = handleDownload(
      source,
      `${t("download.image_name") + new Date().getTime()}.mp4`,
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
          <div className="placeholder absolute inset-0 flex flex-col items-center justify-center rounded-md bg-gray-300 max-md:rounded-sm">
            <Image
              className="absolute top-1/4 size-32 max-sm:size-24"
              src={videoPlaceholder}
              alt={t("image")}
              width={128}
              height={128}
            />
            <p className="mt-24 text-center text-sm text-gray-500 max-md:mt-20">
              {t("placeholder")}
            </p>
          </div>
        )}
        {source && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-auto w-full rounded-md object-contain max-md:rounded-sm"
            onLoadedData={() => setIsLoading(false)}
            loop
            muted
            autoPlay
          >
            <source src={source} type="video/mp4" />
          </video>
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
            onClick={handleDownloadCoverVideo}
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
