import { SanityClient, createClient } from "@sanity/client";
import { env } from "$env/dynamic/private";
import { allPostsSchema, postSchema } from "./types.d";

export function sanityConfig() {
  const config = {
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_PROJECT_DATASET,
    apiVersion: "2021-03-25",
  };
  return createClient({ ...config });
}

/**
 * @param {SanityClient} client
 */

export const getAllPosts = (client) => async () => {
  const allPostsQuery = `*[ _type == 'post']{ title, "slug": slug.current }`;
  const allPosts = await client.fetch(allPostsQuery);
  return allPostsSchema.parse(allPosts);
};

/**
 * @param {SanityClient} client
 */

export const getPostBySlug =
  (client) =>
  async (
    /** @type {string} */
    slug
  ) => {
    const individualPostQuery = `*[ _type == 'post' && slug.current == '${slug}']{title, "slug": slug.current, publishedAt, author->{ name }, "content": body, categories[]->{ title }}`;

    const post = await client.fetch(individualPostQuery);
    return postSchema.parse(post[0]);
  };

export default (client = sanityConfig()) => ({
  getAllPosts: getAllPosts(client),
  getPostBySlug: getPostBySlug(client),
});
