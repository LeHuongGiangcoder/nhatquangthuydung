import Image from "next/image";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { AGENDA, ARTISTS } from "@/lib/content";

/** Mốc "Party" trong chương trình — giờ bắt đầu đêm nhạc lấy từ đây. */
const PARTY = AGENDA[AGENDA.length - 1];

/**
 * Đêm nhạc — nghệ sĩ khách mời. Chỉ một điểm nhấn trang trí là bó hoa trên
 * tiêu đề (R5). Ảnh nghệ sĩ cắt từ design/singer-cutout.png (nền trong suốt
 * sẵn), chân ảnh vuốt mờ thay vì cắt ngang.
 */
export function Artists() {
  return (
    <section id="artists" className="section section--fit section--after-ribbon section--before-divider relative">
      <div className="section-inner">
        <Reveal className="section-head">
          <HeadArt id="el-flower-5" height="6rem" />
          <p className="eyebrow">Nghệ sĩ khách mời</p>
          <h2 className="display-2">Đêm nhạc</h2>
          <Divider />
        </Reveal>

        <Reveal delay={1} className="flex flex-col items-center gap-[var(--space-3)] text-center">
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

        <ul className="artist-grid mt-[var(--space-4)]">
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
              <p className="eyebrow eyebrow--tight mt-[var(--space-1)]">Ca sĩ khách mời</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
