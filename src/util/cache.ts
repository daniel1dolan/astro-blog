import { Redis } from "@upstash/redis";

const serialize = (input: any) => {
  return JSON.parse(JSON.stringify(input));
};

export default async function cache<TData>(
  key: string,
  input: () => Promise<TData> | TData
): Promise<any> {
  const cacheClient = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  });

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
