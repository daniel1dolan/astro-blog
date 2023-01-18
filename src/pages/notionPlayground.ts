import type { APIRoute } from "astro";
import { Client } from "@notionhq/client";
import { addItem, getPost, getPosts } from "../util/notion";
import type { Posts } from "../data/posts";

export const get: APIRoute = async ({ request }: { request: Request }) => {
  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  const singlePost = await getPost("Axolotl");

  console.log(singlePost);

  // const res = await getPosts("Published");
  // console.log(res);

  //   if (!topic) {
  //     return new Response(null, {
  //       status: 404,
  //       statusText: "Topic not found",
  //     });
  //   }

  return new Response(JSON.stringify({ hello: "notion" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
