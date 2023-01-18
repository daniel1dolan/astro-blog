import type { APIRoute } from "astro";
import { clearCache, clearEntireCache } from "../../../util/cache";

export const get: APIRoute = async ({ request }) => {
  if (import.meta.env.AWS_REGION) {
    return new Response(null, {
      status: 401,
      statusText: "Not authorized.",
    });
  }

  const resDeleteKey = await clearEntireCache();

  return {
    body: JSON.stringify({
      result: resDeleteKey,
    }),
  };
};
