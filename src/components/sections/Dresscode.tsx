import Image from "next/image";
import { Divider } from "@/components/Divider";
import { Reveal } from "@/components/Reveal";
import { ART } from "@/lib/layers";
import { DRESSCODE } from "@/lib/content";

/**
 * Dresscode — bảng màu đặt trên tấm giấy viền ren, chỉ có đĩa màu (tên màu
 * vẫn giữ trong `aria-label` cho trình đọc màn hình).
 *
 * Section mở đầu bằng dải hoa ngăn nên không có minh hoạ trên tiêu đề (R5),
 * và đệm trên theo R4 — xem QUY TẮC KHOẢNG CÁCH trong globals.css.
 */
export function Dresscode() {
  return (
    <section id="dresscode" className="section section--fit section--after-divider relative">
      <div className="section-inner">
        <Reveal className="section-head">
          <p className="eyebrow">Cùng nhau đồng điệu</p>
          <h2 className="display-2">Trang phục</h2>
          <Divider />
        </Reveal>

        <Reveal delay={1} className="stack-sm">
          <p className="body-text center text-balance">{DRESSCODE.note}</p>
          <p className="quote center text-balance">{DRESSCODE.avoid}</p>
        </Reveal>

        <Reveal delay={2} className="dress-card">
          <Image
            src={ART["lace-paper"].src}
            alt=""
            aria-hidden
            width={ART["lace-paper"].w}
            height={ART["lace-paper"].h}
            sizes="(max-width: 640px) 100vw, 600px"
            className="dress-card-paper"
          />

          <div className="dress-card-body">
            <ul className="swatch-grid" aria-label="Bảng màu trang phục">
              {DRESSCODE.palette.map((c) => (
                <li key={c.name} className="swatch" aria-label={c.name}>
                  <span
                    className="swatch-dot"
                    style={{ backgroundColor: c.hex }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
