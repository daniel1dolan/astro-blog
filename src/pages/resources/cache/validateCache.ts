import type { APIRoute } from "astro";
import type { Posts } from "../../../data/posts";
import {
  clearCache,
  clearEntireCache,
  getCacheValueByKey,
} from "../../../util/cache";
import { getPosts } from "../../../util/notion";
import requestValidator from "../../../util/requestValidater";

function compareArrays<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  return arr1
    .filter((el) => !arr2.some((e) => JSON.stringify(e) === JSON.stringify(el)))
    .concat(
      arr2.filter(
        (el) => !arr1.some((e) => JSON.stringify(e) === JSON.stringify(el))
      )
    );
}

export const post: APIRoute = async ({ request }) => {
  // Validate request
  const isValidRequest = await requestValidator(request);

  if (!isValidRequest) {
    return new Response(null, {
      status: 401,
      statusText: "Not authorized.",
    });
  }

  // Get notion page list from cache
  const cachedPosts = await getCacheValueByKey<Posts>("v1-posts");
  if (!cachedPosts) {
    console.log("Cleared entire cache because no post list in cache.");
    clearEntireCache();
    return new Response(null, {
      status: 200,
      statusText: "Cleared entire cache because no post list in cache.",
    });
  }

  // Get notion page list from notion
  const posts = (await getPosts()) as Posts;

  // Compare two and see if need to clear list cache
  if (JSON.stringify(posts) !== JSON.stringify(cachedPosts)) {
    const clearedPostList = await clearCache("v1-posts");
    console.log("Validate cache: successfully cleared post list cache.");

    // Compare all pages in notion return to what was in cache
    // Find difference if is any. Collect list of pages to clear.
    // Clear individual pages in cache where necessary
    const postsToClear = compareArrays(cachedPosts, posts).map(
      (el) => `v1-post-${el.slug}`
    );
    const clearedPosts = await clearCache(...postsToClear);
    console.log(`Validate cache: successfully cleared ${clearedPosts} items.`);

    return new Response(
      JSON.stringify({ result: `Successfully cleared ${postsToClear} items.` }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    console.log("Validate cache: nothing to clear.");
    return new Response(
      JSON.stringify({ result: "Successful nothing to clear." }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
