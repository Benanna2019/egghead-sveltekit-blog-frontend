import { SanityClient, createClient } from "@sanity/client";
import { env } from "$env/dynamic/private";
import { allPostsSchema, postSchema } from "./types.d";

/**
 * @return {SanityClient}
 */

function sanityClient() {
  /**
   * @type {import('./types').SanityConfig}
   */
  const config = {
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_PROJECT_DATASET,
    apiVersion: "2021-10-21",
  };
  return createClient({ ...config });
}

export const getAllPosts = async () => {
  const client = sanityClient();
  const allPostsQuery = "*[ _type == 'post']{ title, 'slug': slug.current }";
  /**
   * @type {import('./types').AllPosts}
   */
  const allPosts = await client.fetch(allPostsQuery);
  return allPostsSchema.parse(allPosts);
};

export const getPostBySlug = async (
  /** @type {string} */
  slug
) => {
  const client = sanityClient();
  const postQuery = `*[ _type == 'post' && slug.current == '${slug}']{title, "slug": slug.current, author->{ name }, "date": publishedAt, "content": body, categories[]->{ title } }`;
  /**
   * @type {import('./types').Post[]}
   */
  const post = await client.fetch(postQuery);
  return postSchema.parse(post[0]);
};
