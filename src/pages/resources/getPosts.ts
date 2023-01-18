import { getPosts } from "../../util/notion";

export async function get() {
  const postList = await getPosts();

  if (!postList || postList.length < 0) {
    return new Response(null, {
      status: 404,
      statusText: "No posts found.",
    });
  }

  console.log("server posts");

  console.log(postList);

  return new Response(JSON.stringify({ posts: postList }), {
    status: 200,
    headers: {
      "Content-Type": "application/jsonz",
    },
  });
}
