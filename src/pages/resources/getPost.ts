import type { APIRoute } from "astro";
import { getPost } from "../../util/notion";

export const get: APIRoute = async ({ request }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);

  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response(null, {
      status: 404,
      statusText: "Post not found.",
    });
  }

  const post = await getPost(slug);

  if (!post) {
    return new Response(null, {
      status: 404,
      statusText: "Post not found.",
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/jsonz",
    },
  });
};
