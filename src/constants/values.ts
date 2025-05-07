/**
 * @fileoverview Global constants and configuration values used throughout the application.
 * @author zpl
 * @created 2024-11-20
 */

export const THEME_COOKIE_NAME = "theme";
export const EMPTY_THEME = "light";
export const TRUE_STRING = "true";
export const FALSE_STRING = "false";
export const CHINA_REGION = "0";
export const OUTSIDE_DEPLOY_MODE = "OUTSIDE";
export const INTERNAL_DEPLOY_MODE = "INTERNAL";
export const SHARE_CODE_URL_PARAM = "pwd";
export const SHARE_CODE_STORE_KEY = "share_code";
export const SHARE_CODE_REMEMBER_KEY = "share_code_remember";

export const GLOBAL = {
  /**
   * Internationalization (i18n) configuration settings.
   * @property {Object} LOCALE - Locale-related constants
   * @property {string[]} LOCALE.SUPPORTED - List of supported language codes:
   *   - 'zh': Chinese
   *   - 'en': English
   *   - 'ja': Japanese
   * @property {string} LOCALE.DEFAULT - Default language code (English)
   */
  LOCALE: {
    SUPPORTED: ["zh", "en", "ja"],
    DEFAULT: "en",
  },
  COVER_SAMPLES: [
    {
      id: 1,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_1_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/8c5059fed9334ef395cafad774c5441e.jpg",
      videoPrompt: "cover_list.cover_image.sample_1_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 2,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_2_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/214342c1763647c79851df1d5c66ac9f.jpg",
      videoPrompt: "cover_list.cover_image.sample_2_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 3,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_3_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/compressed_c2ca3f19338241a9b04ba23deb8060c2.jpeg",
      videoPrompt: "cover_list.cover_video.sample_3_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250507/72eb17d14e584679abd59322d636124b.mp4",
    },
    {
      id: 4,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_4_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/7fd0750342244805a9bb0c4c25d265d8.jpg",
      videoPrompt: "cover_list.cover_image.sample_4_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 5,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_5_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/64623cd76aec41dba1e29640470b9a11.jpg",
      videoPrompt: "cover_list.cover_image.sample_5_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 6,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_6_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/c233640571444b7a998c4541509e9c55.jpg",
      videoPrompt: "cover_list.cover_image.sample_6_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 7,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_7_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/6199d5e258d34991858c0915d1ae9511.jpg",
      videoPrompt: "cover_list.cover_image.sample_7_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 8,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_8_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/ebd95f5bee1143e681b2eef62e4d1ee1.jpg",
      videoPrompt: "cover_list.cover_image.sample_8_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 9,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_9_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/c0fb4d624ca2452e8dac6c31dac84091.jpg",
      videoPrompt: "cover_list.cover_image.sample_9_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 10,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_10_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/437bfadd866a4e9a8f9ff95ae05ae731.jpg",
      videoPrompt: "cover_list.cover_video.sample_10_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 11,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_11_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/compressed_2329fc8d30b144d9b81681ce7ce0d827.jpeg",
      videoPrompt: "cover_list.cover_video.sample_11_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250507/8422c5356ecd4dfbac2bd7fc10a708e2.mp4",
    },
    {
      id: 12,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_12_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/compressed_b701cc5823824dffb27e69c68301bd1f.jpeg",
      videoPrompt: "cover_list.cover_video.sample_12_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250507/b647db32cc254e3fb3e8057ba0a2b659.mp4",
    },
    {
      id: 13,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_13_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/cbec9407dd1f4f92958e43103cf92959.jpg",
      videoPrompt: "cover_list.cover_image.sample_13_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 14,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_14_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/d8ce49eb1c4041228e8ca9e6670163da.jpg",
      videoPrompt: "cover_list.cover_image.sample_14_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 15,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_15_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/compressed_9fa78cb8bbd647bf82f6a38d72397ca2.jpeg",
      videoPrompt: "cover_list.cover_video.sample_15_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250507/4a0c7829070d4cbdbec3aee88d37ddae.mp4",
    },
    {
      id: 16,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_16_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/compressed_c797a6679344449bbe443c561ab015d3.jpeg",
      videoPrompt: "cover_list.cover_video.sample_16_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250507/209665c7d4164c4694d4942689f7d3b6.mp4",
    },
    {
      id: 17,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_17_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/246a28049b0b4dabae1dd4f838e13c0e.jpg",
      videoPrompt: "cover_list.cover_image.sample_17_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
    {
      id: 18,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_18_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250507/213da9e673f340c9ac8e83daad5e2caf.jpg",
      videoPrompt: "cover_list.cover_image.sample_18_prompt",
      videoModel: "PixVerse",
      videoUrl: "",
    },
  ],
  COVER_DEFAULT_SAMPLE: {
    id: 1,
    isSample: true,
    sampleType: "coverImageSample",
    itemType: "coverImage",
    imagePrompt: "editTab.form.default_sample.image_prompt",
    imageModel: "Flux",
    imageUrl:
      "https://file.302.ai/gpt/imgs/20250507/8c5059fed9334ef395cafad774c5441e.jpg",
    videoPrompt: "editTab.form.default_sample.video_prompt",
    videoModel: "PixVerse",
    videoUrl: "",
  },
  COVER_IMAGE_SIZE: {
    WIDTH: 957,
    HEIGHT: 1278,
  },
  COVER_TYPE_VALUES: {
    SUPPORTED: [
      {
        id: "0",
        label: "cover_type_select.cover_image",
        value: "coverImage",
      },
      {
        id: "1",
        label: "cover_type_select.cover_video",
        value: "coverVideo",
      },
    ],
    DEFAULT: {
      id: "0",
      label: "cover_type_select.cover_image",
      value: "coverImage",
    },
  },
  COVER_IMAGE_MODEL_VALUES: {
    SUPPORTED: [
      {
        id: "0",
        label: "cover_image_model_select.doubao",
        value: "Doubao",
      },
      {
        id: "1",
        label: "cover_image_model_select.flux",
        value: "Flux",
      },
    ],
    DEFAULT: {
      id: "0",
      label: "cover_image_model_select.doubao",
      value: "Doubao",
    },
  },
  COVER_VIDEO_MODEL_VALUES: {
    SUPPORTED: [
      {
        id: "0",
        label: "cover_video_model_select.PixVerse",
        value: "PixVerse",
      },
      {
        id: "1",
        label: "cover_video_model_select.Kling",
        value: "Kling",
      },
    ],
    DEFAULT: {
      id: "0",
      label: "cover_video_model_select.PixVerse",
      value: "PixVerse",
    },
  },
};
