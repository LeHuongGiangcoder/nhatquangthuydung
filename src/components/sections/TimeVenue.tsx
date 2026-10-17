import Image from "next/image";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { ART, CEREMONY, type ArtId } from "@/lib/layers";
import { COUPLE, PARTIES, type Party } from "@/lib/content";

/**
 * Cảnh vườn lễ cưới, chồng lớp đúng thứ tự ghi trong HUONG-DAN.txt: cỏ & lối
 * đi → cây bách → hai cây lá → hàng rào → nhà vòm → bình hoa → ghế → hoa cuối
 * lối → hoa giữa lối → hoa tiền cảnh.
 *
 * Toạ độ KHÔNG đặt tay: 14 lớp này vốn nằm trên cùng một canvas 1108x1420,
 * script dựng asset đã ghi lại vị trí từng lớp vào CEREMONY. Ở đây chỉ việc
 * đọc ra, nên cảnh ghép lại khít đúng bản gốc ở mọi bề ngang.
 */
const SCENE: { id: ArtId; cls?: string }[] = [
  // Thứ tự này là thứ tự CHỒNG LỚP ghi trong HUONG-DAN.txt (số file tăng
  // dần), không phải thứ tự xa-gần. Cỏ và lối đi nằm DƯỚI CÙNG, dưới cả hàng
  // cây bách: nhìn xuyên qua khoảng trống giữa các cột nhà vòm thì phải thấy
  // hàng cây phía sau, chứ không phải lối đi.
  { id: "cer-lawn" },
  { id: "cer-cypress" },
  { id: "cer-tree-left", cls: "cer-sway cer-sway--l" },
  { id: "cer-tree-right", cls: "cer-sway cer-sway--r" },
  { id: "cer-fence" },
  { id: "cer-gazebo" },
  { id: "cer-urns" },
  { id: "cer-chairs" },
  { id: "cer-rear-left", cls: "cer-bloom cer-bloom--1" },
  { id: "cer-rear-right", cls: "cer-bloom cer-bloom--2" },
  { id: "cer-mid-left", cls: "cer-bloom cer-bloom--3" },
  { id: "cer-mid-right", cls: "cer-bloom cer-bloom--4" },
  { id: "cer-front-left", cls: "cer-bloom cer-bloom--5" },
  { id: "cer-front-right", cls: "cer-bloom cer-bloom--6" },
];
/**
 * Thời gian & Địa điểm — vườn lễ giữ nguyên bố cục gốc của bộ element (nhà
 * vòm giữa, lối đi dẫn lên, ghế hai bên, hoa dọc lối).
 *
 * Tiêu đề đứng trên nền giấy như mọi section khác; thông tin đám cưới gom hết
 * vào MỘT tấm khung giống màn chào ở intro, đặt THẤP hơn nhà vòm để không che
 * mất nó — nhà vòm chính là chỗ làm lễ nên phải thấy được.
 *
 * Gom thông tin vào một khung vì nếu rải thành nhiều khối rời trên cảnh thì
 * dòng dài như địa chỉ sẽ tràn ra ngoài vùng sáng và chìm vào đám ghế.
 *
 * Mặc định tiệc chính để route xem thử từng section vẫn gọi được không tham số.
 */
export function TimeVenue({ party = PARTIES.main }: { party?: Party } = {}) {
  return (
    <section id="time-venue" className="section section--fit cer relative">
      <div className="cer-scene" aria-hidden>
        {SCENE.map((layer) => {
          const pos = CEREMONY[layer.id as keyof typeof CEREMONY];
          return (
            <Image
              key={layer.id}
              src={ART[layer.id].src}
              alt=""
              width={ART[layer.id].w}
              height={ART[layer.id].h}
              sizes="(max-width: 640px) 128vw, 820px"
              className={`cer-layer ${layer.cls ?? ""}`}
              style={{
                left: `${pos.left * 100}%`,
                top: `${pos.top * 100}%`,
                width: `${pos.width * 100}%`,
              }}
            />
          );
        })}
      </div>

      <div className="section-inner cer-content">
        {/* Tiêu đề đứng ngoài khung, trên nền giấy — giống mọi section khác.
            Trong khung chỉ còn thông tin đám cưới. */}
        <Reveal className="section-head">
          <HeadArt id="el-rings" height="4rem" />
          <p className="eyebrow">Thời gian &amp; Địa điểm</p>
          <h2 className="display-2">Ngày chung đôi</h2>
          <Divider />
        </Reveal>

        <Reveal delay={1} className="cer-plate">
          {/* Nét chỉ chạy một vòng quanh khối chữ, bốn góc cong LÕM vào — cùng
              khung với màn chào ở intro. */}
          <svg className="cer-plate-line" viewBox="0 0 320 300" preserveAspectRatio="none" aria-hidden>
            <path
              pathLength="100"
              d="M 20 2 H 300 A 18 18 0 0 0 318 20 V 280 A 18 18 0 0 0 300 298 H 20 A 18 18 0 0 0 2 280 V 20 A 18 18 0 0 0 20 2 Z"
            />
          </svg>

          <p className="place-card-label">The day</p>
          <p className="place-card-date">{party.dateShort}</p>
          <p className="place-card-sub">
            {party.weekday} · {party.time}
          </p>

          <span className="place-card-rule" aria-hidden />

          <p className="place-card-label">The place</p>
          <p className="place-card-venue">{party.venue}</p>
          <p className="place-card-sub">{party.hall}</p>

          <p className="cer-address">{party.address}</p>
          <p className="time-lunar">({COUPLE.lunar})</p>

          <a
            className="btn btn--outline cer-map"
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
