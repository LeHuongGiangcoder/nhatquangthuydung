import Image from "next/image";
import { ART, type ArtId } from "@/lib/layers";

/**
 * Minh hoạ nhỏ đặt ngay trên eyebrow của mỗi tiêu đề section — mỗi section
 * một hình hợp nghĩa (nhẫn cho ngày cưới, nến cho chương trình tối…).
 * Đặt làm phần tử đầu tiên trong `.section-head`.
 */
export function HeadArt({ id, height = "5.5rem" }: { id: ArtId; height?: string }) {
  const art = ART[id];
  return (
    <Image
      src={art.src}
      alt=""
      aria-hidden
      width={art.w}
      height={art.h}
      sizes="10rem"
      className="head-art"
      style={{ height }}
    />
  );
}
