import { Receiver } from "@upstash/qstash";
import type { VerifyRequest } from "@upstash/qstash/types/pkg/receiver";

export default async function requestValidator(request: Request) {
  if (!import.meta.env.VERCEL) return true;

  const body = await request.text();
  const signature = request.headers.get("Upstash-Signature");

  if (!signature) return false;

  const r = new Receiver({
    currentSigningKey: import.meta.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: import.meta.env.QSTASH_NEXT_SIGNING_KEY,
  });

  const isValid = await r.verify({
    signature,
    body,
  });

  return isValid;
}
