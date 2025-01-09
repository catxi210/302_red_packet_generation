export type SEOData = {
  supportLanguages: string[];
  fallbackLanguage: string;
  languages: Record<
    string,
    { title: string; description: string; image: string }
  >;
};

export const SEO_DATA: SEOData = {
  // TODO: Change to your own support languages
  supportLanguages: ["zh", "en", "ja"],
  fallbackLanguage: "en",
  // TODO: Change to your own SEO data
  languages: {
    zh: {
      title: "AI红包封面生成",
      description: "使用AI生成红包封面图",
      image: "/images/global/desc_zh.png",
    },
    en: {
      title: "AI Red Pocket Cover Generation",
      description: "Using AI to generate red pocket cover images",
      image: "/images/global/desc_en.png",
    },
    ja: {
      title: "AI中国紅包生成",
      description: "AIを使って红包のカバーデザインを作成する",
      image: "/images/global/desc_ja.png",
    },
  },
};
