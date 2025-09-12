import { isAxiosError } from "axios";

export function errMessage(err: unknown, fallback = "Something went wrong") {
  if (isAxiosError(err)) {
    const data = err.response?.data as any;
    return data?.title ?? data?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
