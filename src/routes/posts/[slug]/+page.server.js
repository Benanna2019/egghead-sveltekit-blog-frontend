import { getPostBySlug } from "../../../lib/sanity";
import { compile } from "mdsvex";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const routeSlug = params.slug;
  const getSinglePost = await getPostBySlug(routeSlug);
  const { title, slug, content, ...rest } = getSinglePost;
  const post = { title, slug, content: compile(content), ...rest };

  return {
    post,
  };
}
