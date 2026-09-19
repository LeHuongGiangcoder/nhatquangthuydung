import Image from "next/image";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { AGENDA, ARTISTS } from "@/lib/content";

/** Mốc "Party" trong chương trình — giờ bắt đầu đêm nhạc lấy từ đây. */
const PARTY = AGENDA[AGENDA.length - 1];

/**
 * Đêm nhạc — nghệ sĩ khách mời. Trăng khuyết và sao vàng treo trên cao cho
 * không khí buổi tối, hai bó hoa ôm hai góc dưới. Ảnh nghệ sĩ cắt từ
 * design/singer-cutout.png (nền trong suốt sẵn), chân ảnh vuốt mờ thay vì
 * cắt ngang.
 */
export function Artists() {
  return (
    <section id="artists" className="section section--fit section--after-ribbon relative">
      <Decor id="moon" width="19%" top="calc(min(100vw, 40rem) * 0.3)" right="7%" className="motion-float" />
      <Decor id="star" width="6%" top="calc(min(100vw, 40rem) * 0.52)" right="24%" rotate={12} />
      <Decor id="star" width="4.5%" top="calc(min(100vw, 40rem) * 0.36)" left="10%" />
      <Decor id="star" width="3.5%" top="calc(min(100vw, 40rem) * 0.55)" left="21%" rotate={-10} />
      <Decor id="el-flower-4" width="21%" bottom="9%" left="-3%" rotate={-12} className="motion-sway" />
      <Decor id="el-flower-6" width="21%" bottom="9%" right="-3%" rotate={10} flip className="motion-sway" />

      <div className="section-inner">
        <Reveal className="section-head">
          <HeadArt id="el-flower-5" height="6rem" />
          <p className="eyebrow">Nghệ sĩ khách mời</p>
          <h2 className="display-2">Đêm nhạc</h2>
          <Divider />
        </Reveal>

        <Reveal delay={1} className="flex flex-col items-center gap-4 text-center">
          <p className="music-time">
            <span>{PARTY.time}</span>
            <span aria-hidden>·</span>
            <span>{PARTY.title}</span>
          </p>
          <p className="body-text text-balance">
            Sau bữa tiệc, mời bạn nán lại cùng chúng mình trong đêm nhạc ấm áp
            với hai giọng ca khách mời đặc biệt.
          </p>
        </Reveal>

        <ul className="artist-grid mt-8">
          {ARTISTS.map((a, i) => (
            <Reveal
              key={a.name}
              as="li"
              delay={(i + 2) as 2 | 3}
              className="artist"
            >
              <Image
                src={a.src}
                alt={a.name}
                width={a.w}
                height={a.h}
                sizes="(max-width: 640px) 45vw, 260px"
                className="artist-photo"
              />
              <p className="artist-name">{a.name}</p>
              <p className="eyebrow eyebrow--tight mt-1">Ca sĩ khách mời</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={4} className="mt-9 flex flex-col items-center gap-3 pb-24">
          <span className="rule !h-8" />
          <p className="quote center max-w-[15rem] text-balance">
            Âm nhạc là lời chúc đẹp nhất gửi đến đôi uyên ương.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
