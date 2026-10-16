import Image from "next/image";
import { Cross } from "@/components/Cross";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { Reveal } from "@/components/Reveal";
import { AGENDA } from "@/lib/content";
import { ART } from "@/lib/layers";

/**
 * Đường lượn mềm chạy suốt dọc chương trình, đi qua tâm từng mốc giờ. Mỗi
 * đoạn giữa hai mốc là một cung Bézier phình sang một bên, bên kế tiếp phình
 * ngược lại; tay nắm hai phía mỗi mốc thẳng hàng nên đường liền mượt không gãy.
 * Toạ độ theo lưới 100 × (100·số mốc): mỗi mốc chiếm đúng một hàng cao 100.
 */
function trackPath(rows: number) {
  const bulge = (i: number) => (i % 2 === 0 ? 60 : 40);
  let d = `M50 0 C 50 12, ${100 - bulge(0)} 17, 50 50`;
  for (let i = 0; i < rows - 1; i++) {
    const y = 50 + i * 100;
    d += ` C ${bulge(i)} ${y + 33}, ${bulge(i)} ${y + 67}, 50 ${y + 100}`;
  }
  const last = 50 + (rows - 1) * 100;
  d += ` C ${100 - bulge(rows - 2)} ${last + 33}, 50 ${last + 38}, 50 ${last + 50}`;
  return d;
}

export function Agenda() {
  return (
    <section
      id="agenda"
      className="section section--dense section--after-divider section--bleed relative z-[3] pb-[16rem]"
    >
      {/* Hai cột rèm hai bên, đứng sau dải cẩm tú cầu ở gấu — thứ tự DOM quyết
          định lớp trên vì mọi .decor đều z-0.
          Cột phải to hơn và LẬT GƯƠNG: cùng một ảnh đặt đối xứng y hệt thì
          nhìn ra ngay là bản sao, mà lệch cỡ một nhịp thì bố cục mới có
          trọng tâm thay vì cân đối cứng.

          Trong ảnh gốc, THÂN CỘT nằm ở mép phải còn đám lá ở mép trái. Lật
          gương xong thì CỤM HOA về bên trái của lớp (0–28% bề ngang ảnh) và
          thân cột ở 15–38%, nên phải đẩy lớp ra tận -55%: mép trái của lớp
          rơi vào 83% bề ngang màn hình, qua khỏi chữ "Party" kết thúc ở 80%.
          Để gần hơn là cụm hoa chìa vào che mất chữ. */}
      <Decor id="el-43" width="46%" bottom="9%" left="-23%" />
      <Decor id="el-43" width="72%" bottom="7%" right="-55%" flip />

      {/* Gấu section: dải cẩm tú cầu vuốt mờ chân vào nền giấy, ruy băng vắt
          ngang che đúng vùng vuốt đó. Đuôi ruy băng thả xuống section kế
          tiếp: section này vì thế cho tràn dọc (section--bleed) và nằm lớp
          trên (z-[3]). */}
      <div className="section-hem section-hem--ribbon" aria-hidden>
        <Decor id="el-45" width="92%" left="-12%" bottom="45%" className="hem-flowers" />
        <Decor
          id="el-45"
          width="92%"
          right="-12%"
          bottom="45%"
          flip
          className="hem-flowers"
        />
        <Image
          src={ART.ribbon.src}
          alt=""
          width={ART.ribbon.w}
          height={ART.ribbon.h}
          sizes="(max-width: 640px) 105vw, 672px"
          className="hem-ribbon"
        />
      </div>

      <div className="section-inner flex flex-col justify-center">
        <Reveal className="section-head">
          <p className="eyebrow">Trình tự buổi tiệc</p>
          <h2 className="display-2">Chương trình</h2>
          <Divider />
        </Reveal>

        {/* Mốc giờ so le trái / phải, minh hoạ nằm phía đối diện; đường lượn
            đi qua dấu ✛ ở cột giữa của từng hàng. */}
        <div className="agenda-track">
          <svg
            className="agenda-path"
            viewBox={`0 0 100 ${AGENDA.length * 100}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={trackPath(AGENDA.length)} />
          </svg>

          <ol className="agenda-rows">
            {AGENDA.map((item, i) => (
              <Reveal
                key={item.title}
                as="li"
                delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
                className={`agenda-row ${i % 2 ? "agenda-row--right" : "agenda-row--left"}`}
              >
                <div className="agenda-event">
                  <p className="date-text--xs">{item.time}</p>
                  <h3 className="agenda-title">{item.title}</h3>
                  <p className="body-text body-text--sm">{item.desc}</p>
                </div>

                <span className="agenda-node" aria-hidden>
                  <Cross size="0.95rem" />
                </span>

                <Image
                  src={ART[item.art].src}
                  alt=""
                  aria-hidden
                  width={ART[item.art].w}
                  height={ART[item.art].h}
                  sizes="7rem"
                  className="agenda-art"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
