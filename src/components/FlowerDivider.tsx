import Image from "next/image";
import { ART } from "@/lib/layers";

/**
 * Dải hoa vắt ngang ranh giới hai section. Khối cao 0 nên không đẩy bố cục;
 * ảnh canh tâm đúng đường nối và nằm trên cả hai section (z cao hơn z-[3]
 * của Chương trình), che luôn vệt đổi nền giữa hai tấm giấy.
 */
export function FlowerDivider({ id }: { id: "flower-divider-a" | "flower-divider-b" }) {
  const art = ART[id];
  return (
    <div className="flower-divider" aria-hidden>
      <Image
        src={art.src}
        alt=""
        width={art.w}
        height={art.h}
        sizes="(max-width: 640px) 90vw, 560px"
        className="flower-divider-art"
      />
    </div>
  );
}
