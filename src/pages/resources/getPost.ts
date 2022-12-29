import type { APIRoute } from "astro";
import { posts } from "../../data/posts";

export const get: APIRoute = ({ request }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);

  const slug = searchParams.get("slug");

  const post = posts.find((post) => {
    return post.slug === slug;
  });

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
