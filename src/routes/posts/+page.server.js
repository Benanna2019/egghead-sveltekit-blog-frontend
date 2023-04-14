import { getAllPosts } from "../../lib/sanity";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const posts = await getAllPosts();
  return {
    posts,
  };
}
