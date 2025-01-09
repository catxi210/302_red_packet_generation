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
        "https://file.302.ai/gpt/imgs/20241231/1527fdc62e694db3aa50ec0cfca0f0f1.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/ee26f3b87edb4117b391947154ff7b91.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/5e7e989f2c46475795af18a40cffb23d.jpg",
      videoPrompt: "cover_list.cover_video.sample_3_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250107/09b6cbc37411434e801ec88fc0dac481.mp4",
    },
    {
      id: 4,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_4_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20241231/751df4b19115408eab5cee4f46591127.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/b7127f13d38d457f9eaa2c065e56538a.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/76e8754e1e2e420da3e9d74c76392b50.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/7ef4dea2db854d888566e93e1ee71fd3.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/7667349e8de3464e99ff05dbf6e8ada4.jpg",
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
        "https://file.302.ai/gpt/imgs/20241231/0e001ed27dfa4aa1b66346be2cac9676.jpg",
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
        "https://file.302.ai/gpt/imgs/20250103/120da10ab3534797a54423af3891bbd0.jpg",
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
        "https://file.302.ai/gpt/imgs/20250105/7cf963f70e3a43f9a4eccff8230331d8.jpg",
      videoPrompt: "cover_list.cover_video.sample_11_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250107/189d9fbf950841abbf71ec9586a81a0a.mp4",
    },
    {
      id: 12,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_12_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250105/b221895161c940daaeae2565f6753165.jpg",
      videoPrompt: "cover_list.cover_video.sample_12_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250107/847a19cff38f4e719a04ad26edd9c319.mp4",
    },
    {
      id: 13,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_13_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250105/6da9e656dca34125b1f6329ad06e5507.jpg",
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
        "https://file.302.ai/gpt/imgs/20250105/175952f9271d48da93cffa3cd1498dc4.jpg",
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
        "https://file.302.ai/gpt/imgs/20250105/1e071166a5e5439a80ea602a7d7736b4.jpg",
      videoPrompt: "cover_list.cover_video.sample_15_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250105/64adeae6741b4b679e1fcbb93f5155d0.mp4",
    },
    {
      id: 16,
      isSample: true,
      sampleType: "coverVideoSample",
      itemType: "coverVideo",
      imagePrompt: "cover_list.cover_image.sample_16_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250105/a46dfaf592ee4116a1e0971efa8db458.jpg",
      videoPrompt: "cover_list.cover_video.sample_16_prompt",
      videoModel: "PixVerse",
      videoUrl:
        "https://file.302.ai/gpt/imgs/20250105/5ac82fd23b974662939b0dd67da1b131.mp4",
    },
    {
      id: 17,
      isSample: true,
      sampleType: "coverImageSample",
      itemType: "coverImage",
      imagePrompt: "cover_list.cover_image.sample_17_prompt",
      imageModel: "Flux",
      imageUrl:
        "https://file.302.ai/gpt/imgs/20250105/bbcb8c58f3ed4512a57a1938505c8eaa.jpg",
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
        "https://file.302.ai/gpt/imgs/20250105/abd5d5e8ecf14365ae909cd94be7cb5e.jpg",
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
      "https://file.302.ai/gpt/imgs/20241231/1527fdc62e694db3aa50ec0cfca0f0f1.jpg",
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
