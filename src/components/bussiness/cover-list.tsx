import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  GeneratedItem,
  removeItemHistory,
  setCurrentItem,
} from "@/stores/slices/item_history_store";
import ListItem from "./list-item";

interface CoverListProps {
  items: GeneratedItem[];
}

export default function CoverList({ items }: CoverListProps) {
  const t = useTranslations("editTab.image_preview");

  const _setCurrentItem = useSetAtom(setCurrentItem);
  const _removeItemHistory = useSetAtom(removeItemHistory);

  const handleImageClick = (item: GeneratedItem) => {
    const { imagePrompt, isSample, videoPrompt } = item;
    const clickedItem = isSample
      ? {
          ...item,
          imagePrompt: t(`${imagePrompt}`),
          videoPrompt: t(`${videoPrompt}`),
        }
      : item;
    _setCurrentItem(clickedItem);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (itemId: number) => {
    _removeItemHistory(itemId);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="grid w-full max-w-[1200px] grid-cols-3 gap-12 max-md:grid-cols-1">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onClick={() => handleImageClick(item)}
            onDelete={!item.isSample ? () => handleDelete(item.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
