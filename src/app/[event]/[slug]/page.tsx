import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Party } from "@/components/sections/Party";
import { ThankYou } from "@/components/sections/ThankYou";
import { PARTIES } from "@/lib/content";
import { partyFromPath } from "@/lib/guests";

/**
 * Link riêng của từng khách: /<buổi tiệc>/<slug>.
 *
 * RSVP chạy ở chế độ general (một form mở cho tất cả), nên slug chỉ còn là
 * đường dẫn gọn để gửi riêng cho khách — thiệp không chào theo tên nữa.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[event]/[slug]">): Promise<Metadata> {
  const { event } = await params;
  const party = partyFromPath(event);
  if (!party) return {};

  const p = PARTIES[party];
  // "29 . 11 . 2026" giãn chữ cho đẹp trên tấm vé, trong tiêu đề thì bỏ giãn.
  const date = p.dateShort.replace(/\s+/g, "");

  return {
    title: `${p.tab} — ${date}`,
    // Link riêng không nên lọt ra ngoài; thẻ xem trước vẫn hiện bình thường
    // khi khách gửi cho nhau qua Zalo/Messenger.
    robots: { index: false, follow: false },
  };
}

export default async function GuestInvitation({
  params,
}: PageProps<"/[event]/[slug]">) {
  const { event } = await params;

  if (!partyFromPath(event)) notFound();

  return (
    <>
      <main>
        <Hero />
        <Party />
        <ThankYou />
      </main>
    </>
  );
}
