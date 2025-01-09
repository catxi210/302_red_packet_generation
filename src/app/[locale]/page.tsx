"use client";

import CoverList from "@/components/bussiness/cover-list";
import HomeHeader from "@/components/home/header";
import EditTab from "@/components/home/tabs/edit-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GLOBAL } from "@/constants";
import {
  GeneratedItem,
  getItemHistory,
} from "@/stores/slices/item_history_store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

const TAB_TRIGGER_CLASSNAME =
  "relative text-sm after:absolute after:bottom-0 after:left-[12px] after:right-[12px] after:h-[3px] data-[state=active]:shadow-none data-[state=active]:after:bg-[#b91c1c] text-base";

export default function Home() {
  const t = useTranslations("home");

  const itemHistory = useAtomValue(getItemHistory);

  return (
    <div className="container relative mx-auto mt-10 flex min-h-[calc(100vh-92px)] min-w-[375px] max-w-[1280px] flex-col items-center gap-4 rounded-lg border bg-background px-12 py-4 shadow-sm max-md:px-4">
      <HomeHeader />

      <div className="-mx-4 flex h-full w-full flex-col">
        <h1 className="pb-12 pt-4 text-center text-6xl font-bold text-red-600 max-md:pb-6 max-md:pt-2 max-md:text-3xl">
          {t("header.subtitle")}
        </h1>

        <div className="flex w-full flex-col gap-y-12">
          <EditTab />

          <Tabs defaultValue="moreCover">
            <TabsList className="flex w-full justify-center bg-transparent pb-4">
              <TabsTrigger className={TAB_TRIGGER_CLASSNAME} value="moreCover">
                {t("cover_list.title")}
              </TabsTrigger>
              <TabsTrigger
                className={TAB_TRIGGER_CLASSNAME}
                value="historyCover"
              >
                {t("cover_list.history_title")}
              </TabsTrigger>
            </TabsList>
            <TabsContent className="w-auto" value="moreCover">
              <CoverList items={[...GLOBAL.COVER_SAMPLES] as GeneratedItem[]} />
            </TabsContent>
            <TabsContent className="w-auto" value="historyCover">
              <CoverList items={itemHistory} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
