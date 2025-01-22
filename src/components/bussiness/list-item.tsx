/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import coverBottom from "@/assets/images/cover_bottom.png";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { GeneratedItem } from "@/stores/slices/item_history_store";
import { useAtomValue } from "jotai";
import { pollingAtom } from "@/stores/slices/polling_store";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface ListItemProps {
  item: GeneratedItem;
  onClick: () => void;
  onDelete?: () => void;
}

export default function ListItem({ item, onClick, onDelete }: ListItemProps) {
  const t = useTranslations("editTab.image_preview");

  const isPolling = useAtomValue(pollingAtom);
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleClick = () => {
    if (isPolling) return;

    onClick();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPolling) return;

    onDelete?.();
  };

  return (
    <div
      ref={ref}
      className={cn(
        "group relative aspect-[240/397] w-full max-w-[280px] cursor-pointer justify-self-center transition-transform duration-200 hover:scale-105",
        isPolling ? "cursor-not-allowed" : ""
      )}
      onClick={handleClick}
    >
      {isLoading && (
        <div className="absolute inset-0 rounded-md bg-[#f35543]" />
      )}
      {inView && (
        <>
          {item.itemType === "coverImage" ? (
            <img
              className="absolute left-0 top-0 rounded-lg object-contain"
              src={item.imageUrl}
              alt={item.imagePrompt}
              width={957}
              height={1278}
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            <video
              className="absolute inset-0 h-auto w-full rounded-md object-contain max-md:rounded-sm"
              onLoadedData={() => setIsLoading(false)}
              loop
              muted
              autoPlay
            >
              <source src={item.videoUrl} type="video/mp4" />
            </video>
          )}
          <Image
            className="absolute bottom-0 left-0 h-auto w-full object-contain"
            src={coverBottom}
            alt={t("cover_bottom")}
            priority
          />
          {!item.isSample && onDelete && (
            <Trash2
              className="absolute right-2 top-2 size-6 text-red-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              onClick={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
