import Sanity from "../../../lib/sanity";
import { compile } from "mdsvex";

const sanity = Sanity();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const routeSlug = params.slug;
  const getSinglePost = await sanity.getPostBySlug(routeSlug);

  const { content, title, slug, ...rest } = getSinglePost;

  const post = { title, slug, content: compile(content), ...rest };

  return {
    post,
  };
}
