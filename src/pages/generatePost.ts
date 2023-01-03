import openai from "openai";
import fs from "fs";
import type { APIRoute } from "astro";

export const get: APIRoute = async ({ request }: { request: Request }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);

  const topic = searchParams.get("topic");

  console.log("topic generate", topic);

  if (!topic) {
    return new Response(null, {
      status: 404,
      statusText: "Topic not found",
    });
  }

  const configuration = new openai.Configuration({
    apiKey: import.meta.env.OPEN_AI_KEY,
  });

  const client = new openai.OpenAIApi(configuration);

  const resText = await client.createCompletion({
    // prompt: "Write a blog post about taking care of a corgi.",
    prompt: `Write a blog post about ${topic}.`,
    temperature: 0.7,
    max_tokens: 2048,
    model: "text-davinci-003",
  });

  console.log(resText.data.choices);
  const blogText = resText.data.choices[0].text;

  const resImage = await client.createImage({
    prompt: topic,
    n: 1,
    response_format: "url",
    size: "1024x1024",
  });

  const imagejson = resImage.data.data[0].url;

  fetch(imagejson as string)
    .then((response) => {
      return response.arrayBuffer();
    })
    .then((buffer) => {
      fs.writeFileSync("image.jpeg", Buffer.from(buffer));
    });

  console.log(resImage.data.data[0].url);

  console.log("this is on the server");

  return new Response(JSON.stringify({ imagejson, blogText }), {
    status: 200,
    headers: {
      "Content-Type": "application/jsonz",
    },
  });
};
