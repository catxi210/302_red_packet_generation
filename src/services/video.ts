/* eslint-disable camelcase */
import { apiKy, toolApiKy } from "@/api";
import { z } from "zod";

const KlingTaskArgumentSchema = z.object({
  name: z.string(),
  value: z.string(),
});
const KlingTaskInputSchema = z.object({
  blobStorage: z.null(),
  fromWorkId: z.null(),
  inputType: z.string(),
  name: z.string(),
  token: z.null(),
  url: z.string(),
});
const KlingTaskInfoSchema = z.object({
  arguments: z.array(KlingTaskArgumentSchema),
  extraArgs: z.record(z.any()),
  inputs: z.array(KlingTaskInputSchema),
  type: z.string(),
});
const KlingTaskSchema = z.object({
  createTime: z.number(),
  deleted: z.boolean(),
  favored: z.boolean(),
  id: z.string(),
  status: z.number(),
  taskInfo: KlingTaskInfoSchema,
  type: z.string(),
  updateTime: z.number(),
  viewTime: z.number(),
  viewed: z.boolean(),
});
const KlingWorkResourceSchema = z.object({
  duration: z.number(),
  height: z.number(),
  resource: z.string(),
  width: z.number(),
});

const KlingWorkSelfCommentSchema = z.object({
  content: z.string(),
  prompts: z.array(z.any()),
  tags: z.array(z.any()),
});

const KlingWorkUserProfileSchema = z.object({
  enableConsole: z.boolean(),
  enableInvoiceTitleCollection: z.boolean(),
  features: z.array(z.any()),
  introduction: z.string(),
  kol: z.boolean(),
  userAvatar: z.array(z.any()),
  userId: z.number(),
  userName: z.string(),
});

const KlingWorkSchema = z.object({
  contentType: z.string(),
  cover: KlingWorkResourceSchema,
  createTime: z.number(),
  deleted: z.boolean(),
  favored: z.boolean(),
  lipSyncStatus: z.number(),
  publishStatus: z.string(),
  publishTime: z.number(),
  reportNum: z.number(),
  resource: KlingWorkResourceSchema,
  selfAttitude: z.string(),
  selfComment: KlingWorkSelfCommentSchema,
  starNum: z.number(),
  starred: z.boolean(),
  status: z.number(),
  submitTime: z.number(),
  taskInfo: KlingTaskInfoSchema,
  type: z.string(),
  userProfile: KlingWorkUserProfileSchema,
});

export const KlingTaskResponseSchema = z.object({
  data: z.object({
    limitation: z.object({
      limit: z.number(),
      remaining: z.number(),
      type: z.string(),
    }),
    message: z.string(),
    status: z.number(),
    task: KlingTaskSchema,
    userTickets: z.object({
      ticket: z.array(z.any()),
    }),
    works: z.array(KlingWorkSchema),
  }),
  message: z.string(),
  result: z.number(),
  status: z.number(),
  timestamp: z.array(z.number()),
});

export const PixVerseTaskResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    task_id: z.string(),
  }),
});
export const PixVerseTaskStatusResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    create_time: z.string(),
    image_url: z.string().nullable(),
    msg: z.string().nullable(),
    point: z.string(),
    poster: z.string().nullable(),
    prompt: z.string(),
    refund: z.string(),
    state: z.string(),
    status: z.string(),
    task_id: z.string(),
    update_time: z.string(),
    video_url: z.string().nullable(),
  }),
});
export const ResizeVideoResponseSchema = z.object({
  url: z.string(),
});

export type PixVerseTaskResponse = z.infer<typeof PixVerseTaskResponseSchema>;
export type PixVerseTaskStatusResponse = z.infer<
  typeof PixVerseTaskStatusResponseSchema
>;
export type KlingTaskResponse = z.infer<typeof KlingTaskResponseSchema>;
export type ResizeVideoResponse = z.infer<typeof ResizeVideoResponseSchema>;

const GET_PIXVERSE_TASK_URL = "pix/generate";
const GET_PIXVERSE_TASK_STATUS_URL = "pix/task/{id}/fetch";
const GET_KLING_TASK_URL = "klingai/m2v_16_img2video_hq_5s";
const GET_KLING_TASK_STATUS_URL = "klingai/task/{id}/fetch";
const GET_RESIZE_VIDEO_URL = "klingai/video/resize";

export async function getPixVerseTask(params: {
  prompt: string;
  image: string;
}): Promise<PixVerseTaskResponse> {
  return await apiKy
    .post(GET_PIXVERSE_TASK_URL, {
      json: {
        prompt: params.prompt,
        image: params.image,
        model: "v3.5",
      },
    })
    .json<PixVerseTaskResponse>();
}

export async function getPixVerseTaskStatus(
  task_id?: string
): Promise<PixVerseTaskStatusResponse> {
  return await apiKy
    .get(GET_PIXVERSE_TASK_STATUS_URL.replace("{id}", task_id!))
    .json<PixVerseTaskStatusResponse>();
}

export async function getKlingTask(params: {
  prompt: string;
  inputImage: string;
}): Promise<KlingTaskResponse> {
  return await apiKy
    .post(GET_KLING_TASK_URL, {
      json: {
        prompt: params.prompt,
        input_image: params.inputImage,
        cfg: 0.5,
        aspect_ratio: "9:16",
      },
    })
    .json<KlingTaskResponse>();
}

export async function getKlingTaskStatus(
  task_id?: string
): Promise<KlingTaskResponse> {
  return await apiKy
    .get(GET_KLING_TASK_STATUS_URL.replace("{id}", task_id!))
    .json<KlingTaskResponse>();
}

export async function getResizeVideo(params: {
  videoUrl: string;
}): Promise<ResizeVideoResponse> {
  return await toolApiKy
    .post(GET_RESIZE_VIDEO_URL, {
      json: params,
    })
    .json<ResizeVideoResponse>();
}
