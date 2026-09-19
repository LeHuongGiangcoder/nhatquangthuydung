import Image from "next/image";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { ART } from "@/lib/layers";
import { COUPLE, PARTIES, type Party } from "@/lib/content";

/**
 * Thời gian & Địa điểm — "thẻ tên trên bàn tiệc": đĩa bạc kèm dao nĩa, tấm
 * thẻ giấy ở giữa in ngày và nơi tổ chức, dấu sáp vàng gắn góc phải thẻ, bó
 * hoa mộc lan đặt chéo góc dưới trái.
 *
 * Khung đĩa rộng hơn cột nội dung một chút (dao nĩa được phép tràn ra lề) để
 * tấm thẻ đủ rộng cho chữ. Toạ độ thẻ đo trên el-plate.webp: 18–80% ngang,
 * 30–75% dọc. Cỡ chữ tính theo bề ngang khung (cqw) nên chữ luôn nằm gọn
 * trong thẻ ở mọi màn hình.
 *
 * Mặc định tiệc chính để route xem thử từng section vẫn gọi được không tham số.
 */
export function TimeVenue({ party = PARTIES.main }: { party?: Party } = {}) {
  return (
    <section id="time-venue" className="section section--fit relative">
      <div className="section-inner">
        <Reveal className="section-head">
          <HeadArt id="el-rings" height="4.5rem" />
          <p className="eyebrow">Thời gian &amp; Địa điểm</p>
          <h2 className="display-2">Ngày chung đôi</h2>
          <Divider />
        </Reveal>

        <Reveal delay={1}>
          <div className="place-card">
            <Image
              src={ART["el-plate"].src}
              alt=""
              aria-hidden
              width={ART["el-plate"].w}
              height={ART["el-plate"].h}
              sizes="(max-width: 640px) 110vw, 600px"
              className="place-card-art"
            />

            <div className="place-card-text">
              <p className="place-card-label">The day</p>
              <p className="place-card-date">{party.dateShort}</p>
              <p className="place-card-sub">
                {party.weekday} · {party.time}
              </p>

              <span className="place-card-rule" aria-hidden />

              <p className="place-card-label">The place</p>
              <p className="place-card-venue">{party.venue}</p>
              <p className="place-card-sub">{party.hall}</p>
            </div>

            <Decor id="seal" width="13%" top="21%" right="14%" front className="place-card-seal" />
            <Decor
              id="el-bouquet-magnolia"
              width="32%"
              bottom="-6%"
              left="3%"
              rotate={-24}
              front
              className="motion-sway"
            />
          </div>
        </Reveal>

        <Reveal delay={2} className="venue-text">
          <p className="body-text body-text--sm text-balance">{party.address}</p>
          <p className="time-lunar">({COUPLE.lunar})</p>
        </Reveal>

        <Reveal delay={3} className="btn-row mt-7">
          <a
            className="btn btn--outline"
            href={party.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Xem bản đồ
          </a>
        </Reveal>
      </div>
    </section>
  );
}
