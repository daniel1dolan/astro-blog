import { Redis } from "@upstash/redis";

const getCacheClient = () => {
  return new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  });
};

const serialize = (input: any) => {
  return JSON.parse(JSON.stringify(input));
};

export default async function cache<TData>(
  key: string,
  input: () => Promise<TData> | TData
): Promise<any> {
  const cacheClient = getCacheClient();

  try {
    const res = await cacheClient.get(key);

    if (res) {
      console.log("[Cache] HIT key: " + key);
      return res;
    }
  } catch (err: any) {
    console.error(`[Cache] Error GET ${key}: ${err.message}`);

    return input();
  }

  // Cache has no hit.
  let data;

  try {
    data = await input();

    cacheClient.set(key, serialize(data));
    console.log(
      `[Cache] MISS ${key}, SET ${JSON.stringify(data).length} bytes`
    );

    return data;
  } catch (err: any) {
    console.error(`[Cache] Error SET ${key}: ${err.message}`);

    return input();
  }
}

export async function clearEntireCache() {
  const cacheClient = getCacheClient();

  const res = await cacheClient.flushdb();

  return res;
}

export async function clearCache(key: string) {
  const cacheClient = getCacheClient();

  const res = await cacheClient.del(key);

  return res;
}
