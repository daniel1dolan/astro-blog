import type { Posts } from "../../data/posts";
import cache from "../../util/cache";
import { getPosts } from "../../util/notion";

export async function get() {
  const postList = await cache<Array<Posts[number] | undefined> | undefined>(
    "v1-posts",
    () => getPosts()
  );

  if (!postList || postList.length < 0) {
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
