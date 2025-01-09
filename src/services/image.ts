/* eslint-disable camelcase */
import { apiKy } from "@/api";
import { z } from "zod";

const COVER_IMAGE_SIZE = { width: 957, height: 1278 };

export const PromptResponseSchema = z.object({
  output: z.string(),
});
export const FluxImageResponseSchema = z.object({
  images: z.array(
    z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
      content_type: z.string(),
    })
  ),
  timings: z.object({}),
  seed: z.number(),
  has_nsfw_concepts: z.array(z.boolean()),
  prompt: z.string(),
});
export const DoubaoImageResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    algorithm_base_resp: z.object({
      status_code: z.number(),
      status_message: z.string(),
    }),
    binary_data_base64: z.array(z.string()),
    image_urls: z.array(z.string()),
    llm_result: z.string(),
    pe_result: z.string(),
    predict_tags_result: z.string(),
    rephraser_result: z.string(),
    request_id: z.string(),
    vlm_result: z.string(),
  }),
  message: z.string(),
  request_id: z.string(),
  status: z.number(),
  time_elapsed: z.string(),
});

export type PromptResponse = z.infer<typeof PromptResponseSchema>;
export type FluxImageResponse = z.infer<typeof FluxImageResponseSchema>;
export type DoubaoImageResponse = z.infer<typeof DoubaoImageResponseSchema>;

export type ItemType = "coverImage" | "coverVideo";
export type ImageModel = "Doubao" | "Flux";
export type VideoModel = "Pixverse" | "Kling";

const GET_COVER_PROMPT_URL = "v1/chat/completions";
const GET_IMAGE_FLUX_URL = "302/submit/flux-pro-v1.1";
const GET_IMAGE_DOUBAO_URL = "doubao/drawing";

/**
 * Get red packet cover prompt
 * @param params.prompt user input prompt
 * @returns
 */
export async function getCoverPromptByLLM(params: {
  prompt: string;
}): Promise<PromptResponse> {
  const response = await apiKy
    .post(GET_COVER_PROMPT_URL, {
      json: {
        model: "Doubao-pro-32k",
        message: `Your task is to generate a WeChat red packet cover image based on the provided content.

Optimize and enhance the prompts provided for image generation to ensure that the Flux model can generate excellent views.
You should provide a detailed and accurate description of the prompt view, and if the provided prompt is too simple, you should add some sections.
Introduce the topic with higher weights. Do not use any introductory phrases such as' This image shows', 'In the scene', or other similar phrases. Do not use words that describe cultural values or spirits, such as "creating xxx atmosphere", "creating xxx presence", "implying xxx", "enhancing xxxx of the scene", or others. Do not use ambiguous words. Describe the scene you saw. Do not overly describe things that are difficult to describe.


requirement:
-In order not to affect user recognition of text, the selection of cover background color should avoid being too close to the color of user nicknames and blessings, and the color changes should not be too much.
-The cover design should avoid the areas of avatars, nicknames, and blessings as much as possible. If it is impossible to avoid, it is also necessary to avoid overly complex patterns that may affect text recognition.
-The pattern design should be beautiful and concise, avoiding clutter and scattered focus.
-Real portraits of individuals should be avoided as much as possible to avoid legal disputes.
-Advertisements such as slogans and product images should not appear.
-If it involves writing, use single quotation marks to enclose the desired text.

Input content:< text>
${params.prompt}
</text>
Always return English results in plain text format and do not add any other content.`,
      },
    })
    .text();

  const sanitizedResponse = response.replace(/\\'/g, "'");

  return JSON.parse(sanitizedResponse) as PromptResponse;
}

/**
 * Get red packet cover image by Flux
 * @param params.prompt llm output prompt
 * @returns
 */
export async function getImageByFlux(params: {
  prompt: string;
}): Promise<FluxImageResponse> {
  return await apiKy
    .post(GET_IMAGE_FLUX_URL, {
      json: {
        prompt: params.prompt,
        image_size: COVER_IMAGE_SIZE,
        num_inference_steps: 28,
        guidance_scale: 3.5,
      },
    })
    .json<FluxImageResponse>();
}

/**
 * Get red packet cover image by Doubao
 * @param params.prompt user input prompt
 * @returns
 */
export async function getImageByDoubao(params: {
  prompt: string;
}): Promise<DoubaoImageResponse> {
  return await apiKy
    .post(GET_IMAGE_DOUBAO_URL, {
      json: {
        prompt: params.prompt,
        model_version: "general_v2.1_L",
        req_schedule_conf: "general_v20_9B_pe",
        llm_seed: -1,
        scale: 3.5,
        ddim_steps: 25,
        width: COVER_IMAGE_SIZE.width,
        height: COVER_IMAGE_SIZE.height,
        use_pre_llm: true,
        use_sr: false,
        return_url: true,
      },
    })
    .json<DoubaoImageResponse>();
}
