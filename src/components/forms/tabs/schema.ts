import { z } from "zod";

export const editFormSchema = z
  .object({
    currentType: z.string(),
    coverImagePrompt: z.string(),
    coverImageModel: z.string(),
    coverImageUrl: z.string(),
    coverVideoPrompt: z.string(),
    coverVideoModel: z.string(),
  })
  .superRefine((data, ctx) => {
    if (
      data.currentType === "coverImage" ||
      data.currentType === "coverImageSample"
    ) {
      if (!data.coverImagePrompt || !data.coverImagePrompt.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cover image prompt is required",
          path: ["coverImagePrompt"],
        });
      }
      if (
        !data.coverImageModel ||
        !["Doubao", "Flux"].includes(data.coverImageModel)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cover image model is required",
          path: ["coverImageModel"],
        });
      }
    }
    if (
      data.currentType === "coverVideo" ||
      data.currentType === "coverVideoSample"
    ) {
      if (!data.coverVideoPrompt || !data.coverVideoPrompt.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cover video prompt is required",
          path: ["coverVideoPrompt"],
        });
      }
      if (
        !data.coverVideoModel ||
        !["PixVerse", "Kling"].includes(data.coverVideoModel)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cover video model is required",
          path: ["coverVideoModel"],
        });
      }
      if (!data.coverImageUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cover image url is required",
          path: ["coverImageUrl"],
        });
      }
    }
  });
export type EditFormSchemaType = z.infer<typeof editFormSchema>;
