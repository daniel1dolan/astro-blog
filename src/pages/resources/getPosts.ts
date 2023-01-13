import { posts } from "../../data/posts";

export async function get() {
  const postList = posts;

  if (postList.length < 0) {
    return new Response(null, {
      status: 404,
      statusText: "No posts found.",
    });
  }

  console.log("server posts");

  return new Response(JSON.stringify({ posts: postList }), {
    status: 200,
    headers: {
      "Content-Type": "application/jsonz",
    },
  });
}
