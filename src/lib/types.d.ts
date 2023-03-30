import * as z from "zod";

export const allPostsSchema = z.array(
  z.object({
    title: z.string(),
    slug: z.string(),
  })
);

export const postSchema = z.object({
  title: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  author: z.object({
    name: z.string(),
  }),
  content: z.string(),
  categories: z.array(
    z.object({
      title: z.string(),
    })
  ),
});

export type Post = z.infer<typeof postSchema>;
