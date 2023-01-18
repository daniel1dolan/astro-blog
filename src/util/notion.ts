import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Posts } from "../data/posts";

async function getNotionClient() {
  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  return { notion, databaseId };
}

export async function addItem(item: Posts[number]) {
  try {
    const { notion, databaseId } = await getNotionClient();

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: item.title,
              },
            },
          ],
        },
        Content: {
          rich_text: [
            {
              text: {
                content: item.body,
              },
            },
          ],
        },
        Author: {
          rich_text: [{ text: { content: item.author } }],
        },
        Slug: {
          rich_text: [{ text: { content: item.slug } }],
        },
        ImageUrl: {
          url: item.imageUrl,
        },
      },
    });
    console.log(response);
    console.log(`Success! Entry added to database ${databaseId}.`);
  } catch (error) {
    console.error(error);
  }
}

function getPostObjFromDatabaseObj(obj: PageObjectResponse) {
  if (
    !obj?.properties.Content ||
    !obj.properties.Name ||
    !obj.properties.Author ||
    !obj.properties.Slug ||
    !obj.properties.ImageUrl
  )
    return;
  return {
    body: obj.properties.Content.rich_text[0].text.content,
    title: obj.properties.Name.title[0]?.text.content,
    author: obj.properties.Author.rich_text[0]?.text.content,
    slug: obj.properties.Slug.rich_text[0]?.text.content,
    imageUrl: obj.properties.ImageUrl.url,
  };
}

export async function getPosts() {
  try {
    const { notion, databaseId } = await getNotionClient();

    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: { equals: "Published" },
      },
    });

    console.log("Success! Database retrieved.");

    return res.results.map((el) => {
      return getPostObjFromDatabaseObj(el as PageObjectResponse);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getPost(slug: string) {
  try {
    const { notion, databaseId } = await getNotionClient();

    const post = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (post.results.length > 0) {
      return getPostObjFromDatabaseObj(post.results[0] as PageObjectResponse);
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}
