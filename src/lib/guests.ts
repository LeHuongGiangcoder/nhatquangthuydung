import { type PartyId } from "@/lib/content";

/** Đoạn đầu của link riêng: /main/<slug>. */
export function partyFromPath(value: string): PartyId | null {
  return value.trim().toLowerCase() === "main" ? "main" : null;
}
