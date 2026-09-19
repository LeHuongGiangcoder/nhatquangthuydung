import Image from "next/image";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { ART } from "@/lib/layers";
import { DRESSCODE } from "@/lib/content";

/**
 * Dresscode — bảng màu viết trên tấm giấy viền ren, đôi giày cô dâu chú rể
 * bước tới mép dưới tấm giấy (như ảnh chụp từ trên xuống).
 *
 * Giày cắt thẳng ở mép dưới nên section không có đệm dưới: chân giày chạm
 * đúng ranh giới section. Bảng màu nằm trong lòng giấy (đo trên
 * lace-paper.webp: 14–86% ngang, 17–83% dọc), cỡ chữ và đĩa màu tính theo bề
 * ngang tấm giấy (cqw).
 */
export function Dresscode() {
  return (
    <section id="dresscode" className="section section--fit section--shoes relative">
      <div className="section-inner">
        <Reveal className="section-head">
          <HeadArt id="el-mannequin" height="6.5rem" />
          <p className="eyebrow">Cùng nhau đồng điệu</p>
          <h2 className="display-2">Trang phục</h2>
          <Divider />
        </Reveal>

        <Reveal delay={1} className="stack-sm">
          <p className="body-text center text-balance">{DRESSCODE.note}</p>
          <p className="quote center text-balance">{DRESSCODE.avoid}</p>
        </Reveal>

        <Reveal delay={2} className="dress-card-wrap">
          <div className="dress-card">
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
              <p className="dress-card-label">Bảng màu</p>
              <ul className="swatch-grid">
                {DRESSCODE.palette.map((c) => (
                  <li key={c.name} className="swatch">
                    <span
                      className="swatch-dot"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="swatch-name">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Image
            src={ART.shoes.src}
            alt="Giày cô dâu và chú rể"
            width={ART.shoes.w}
            height={ART.shoes.h}
            sizes="(max-width: 640px) 80vw, 460px"
            className="dress-shoes"
          />
        </Reveal>
      </div>
    </section>
  );
}
