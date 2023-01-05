import type { APIRoute } from "astro";
import { Client } from "@notionhq/client";

export const get: APIRoute = async ({ request }: { request: Request }) => {
  //   const searchParams = new URLSearchParams(request.url.split("?")[1]);

  //   const topic = searchParams.get("topic");

  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  async function addItem(text: string) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: text,
                },
              },
            ],
          },
        },
      });
      console.log(response);
      console.log("Success! Entry added.");
    } catch (error) {
      console.error(error);
    }
  }

  //   async function deleteItem(item) {
  //     try {
  //         const response = await notion.
  //     } catch (err) {
  //       console.error(err);

  //     }
  //   }

  //   addItem("Yurts in Big Sur, California");

  //   if (!topic) {
  //     return new Response(null, {
  //       status: 404,
  //       statusText: "Topic not found",
  //     });
  //   }

  return new Response(JSON.stringify({ hello: "notion" }), {
    status: 200,
    headers: {
      "Content-Type": "application/jsonz",
    },
  });
};
