import type { APIRoute } from "astro";
import { clearCache } from "../../../util/cache";

export const get: APIRoute = async ({ params, request }) => {
  if (import.meta.env.AWS_REGION) {
    return new Response(null, {
      status: 401,
      statusText: "Not authorized.",
    });
  }

  const key = params.key;

  if (!key)
    return new Response(null, {
      status: 404,
      statusText: "Key not found.",
    });

  const resDeleteKey = await clearCache(key);

  return {
    body: JSON.stringify({
      result: resDeleteKey,
    }),
  };
};
