import Image from "next/image";
import type { CSSProperties } from "react";
import { ART, type ArtId } from "@/lib/layers";

type DecorProps = {
  id: ArtId;
  /** Bề rộng của element, tính theo % bề rộng khung cha */
  width: string;
  /** Vị trí — dùng bất kỳ cặp nào (top/bottom, left/right) */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: number;
  flip?: boolean;
  /** Đưa element lên trên nội dung */
  front?: boolean;
  opacity?: number;
  /** Tải ngay thay vì chờ lazy — dùng cho decor nằm trên màn hình đầu.
      Next 16 đã bỏ `priority`; ảnh above-the-fold nay dùng loading="eager". */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Element trang trí watercolor.
 * Luôn giữ nguyên độ nét — không blur, không tint, không blend mode.
 */
export function Decor({
  id,
  width,
  top,
  bottom,
  left,
  right,
  rotate,
  flip,
  front,
  opacity,
  eager,
  className = "",
  style,
}: DecorProps) {
  const layer = ART[id];
  const transforms = [
    flip ? "scaleX(-1)" : null,
    rotate ? `rotate(${rotate}deg)` : null,
  ].filter(Boolean);

  return (
    <Image
      src={layer.src}
      alt=""
      aria-hidden
      width={layer.w}
      height={layer.h}
      loading={eager ? "eager" : undefined}
      sizes="(max-width: 640px) 100vw, 640px"
      className={`decor ${front ? "decor--front" : ""} ${className}`}
      style={{
        width,
        top,
        bottom,
        left,
        right,
        opacity,
        transform: transforms.length ? transforms.join(" ") : undefined,
        ...style,
      }}
    />
  );
}
