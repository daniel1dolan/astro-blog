import type { APIRoute } from "astro";
import { saveImage } from "../util/saveImage";
import { addItem } from "../util/notion";

export const post: APIRoute = async ({ request }: { request: Request }) => {
  if (import.meta.env.VERCEL) {
    return new Response(null, {
      status: 401,
      statusText: "Not authorized.",
    });
  }

  if (!request.body) {
    return new Response(null, {
      status: 500,
      statusText: "No request sent.",
    });
  }
  const body = await request.json();

  console.log(body);

  if (!body.topic) {
    return new Response(null, {
      status: 500,
      statusText: "Missing topic.",
    });
  } else if (!body.image) {
    return new Response(null, {
      status: 500,
      statusText: "Missing image.",
    });
  } else if (!body.text) {
    return new Response(null, {
      status: 500,
      statusText: "Missing text.",
    });
  } else if (!body.author) {
    return new Response(null, {
      status: 500,
      statusText: "Missing author.",
    });
  }

  const resSave = await saveImage(body.image, body.topic);
  console.log(resSave);

  if (!resSave?.url) {
    return new Response(null, {
      status: 500,
      statusText: "Error saving image.",
    });
  }

  const newPostObj = {
    imageUrl: resSave.url,
    body: body.text,
    title: body.topic,
    slug: body.topic,
    author: body.author,
  };
  const res = await addItem(newPostObj);
  console.log(res);

  return new Response(
    JSON.stringify({ status: "Successful.", data: newPostObj }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
