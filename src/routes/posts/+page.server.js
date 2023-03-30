import Sanity from "../../lib/sanity";

const sanity = Sanity();
/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const allPosts = await sanity.getAllPosts();
  return {
    allPosts,
  };
}
