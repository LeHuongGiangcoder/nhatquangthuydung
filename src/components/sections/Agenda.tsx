import { Fragment } from "react";
import Image from "next/image";
import { Cross } from "@/components/Cross";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { AGENDA } from "@/lib/content";
import { ART } from "@/lib/layers";

/**
 * Đường nối giữa hai mốc giờ: một nét lượn chữ S thay cho vạch thẳng, dấu ✛
 * nằm giữa. `flip` đảo chiều lượn để các đoạn nối nhau thành dải uốn lượn.
 */
function CurvyLink({ flip }: { flip: boolean }) {
  return (
    <li className="agenda-link" aria-hidden>
      <svg
        viewBox="0 0 40 96"
        className="agenda-curve"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d="M20 2 C 40 26, 0 70, 20 94" />
      </svg>
      <Cross size="1rem" className="agenda-link-cross opacity-60" />
    </li>
  );
}

export function Agenda() {
  return (
    <section
      id="agenda"
      className="section section--dense section--bleed relative z-[3] pb-[16rem]"
    >
      {/* Bên trái cột rèm, bên phải tượng Aphrodite — cả hai đứng sau dải cẩm
          tú cầu ở gấu, thứ tự DOM quyết định lớp trên vì mọi .decor đều z-0. */}
      <Decor id="el-43" width="46%" bottom="9%" left="-23%" />
      <Decor id="el-statue" width="25%" bottom="11%" right="-4%" />

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
          <HeadArt id="el-candles" height="5rem" />
          <p className="eyebrow">Trình tự buổi tiệc</p>
          <h2 className="display-2">Chương trình</h2>
          <Divider />
        </Reveal>

        <ol className="m-0 list-none p-0 text-center">
          {AGENDA.map((item, i) => (
            <Fragment key={item.title}>
              {i > 0 && <CurvyLink flip={i % 2 === 0} />}

              <Reveal
                as="li"
                delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
                className="flex flex-col items-center"
              >
                <Image
                  src={ART[item.art].src}
                  alt=""
                  aria-hidden
                  width={ART[item.art].w}
                  height={ART[item.art].h}
                  sizes="6rem"
                  className="agenda-art"
                />
                <p className="date-text--xs mt-3">{item.time}</p>
                <h3 className="display-3 mt-3 !text-[1.5rem]">{item.title}</h3>
                <p className="body-text body-text--sm mt-2 max-w-[19rem] text-balance">
                  {item.desc}
                </p>
              </Reveal>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
