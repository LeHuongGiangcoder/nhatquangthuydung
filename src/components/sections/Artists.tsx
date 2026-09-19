import Image from "next/image";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { ARTISTS } from "@/lib/content";

/**
 * Nghệ sĩ khách mời của đêm nhạc. Ảnh cắt từ design/singers.png, nền trắng
 * đã tách thành trong suốt (giữ bóng đổ), chân ảnh vuốt mờ thay vì cắt ngang.
 */
export function Artists() {
  return (
    <section id="artists" className="section section--fit section--after-ribbon relative">
      <div className="section-inner">
        <Reveal className="section-head">
          <HeadArt id="el-flower-5" height="6rem" />
          <p className="eyebrow">Nghệ sĩ khách mời</p>
          <h2 className="display-2">Đêm nhạc</h2>
          <Divider />
        </Reveal>

        <ul className="artist-grid">
          {ARTISTS.map((a, i) => (
            <Reveal
              key={a.name}
              as="li"
              delay={(i + 1) as 1 | 2}
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
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
