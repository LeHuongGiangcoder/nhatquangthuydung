"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Cross } from "@/components/Cross";
import { Reveal } from "@/components/Reveal";
import { ART, type ArtId } from "@/lib/layers";
import { COUPLE, HERO, MONOGRAM } from "@/lib/content";

type HeroProps = {
  /** Tên khách lấy từ link riêng; bỏ trống thì dùng lời chào chung. */
  guestName?: string;
};

type Layer = {
  id: ArtId;
  /** Class riêng của lớp — nhịp vào sân khấu và cách rời khung lúc mở thiệp. */
  cls?: string;
  style: React.CSSProperties;
};

/* ───────────────────────────────────────────────────────────────────────────
   MỘT CẢNH DUY NHẤT, HAI MÀN

   Trước đây intro và hero là hai trang rời, mở thiệp là đổi trang. Giờ chỉ còn
   một khung hình: camera đẩy tới, lớp khung cổng bay vượt qua ống kính, lớp
   tiền cảnh hiện lên, vòm hoa đỉnh ở lại làm vòm hoa của hero. Người xem
   không thấy một trang mới, chỉ thấy mình bước qua cổng vào vườn.

   Mọi toạ độ tính theo .sc-stage — khung tỉ lệ cố định 375x812 — chứ không
   theo viewport. Neo theo viewport thì trên màn rộng cột phình ngang còn
   khoảng cách dọc co lại, cả khung cổng vỡ tỉ lệ.
   ─────────────────────────────────────────────────────────────────────────── */

/** Khu vườn — có mặt ở cả hai màn, chỉ trôi xuống và nở ra khi camera tiến tới. */
const GARDEN: Layer[] = [
  // Hàng cây xa kéo CAO hơn cả nóc lâu đài: nó là lớp lấp những nêm giấy trắng
  // còn hở giữa mái nhà, thân cột và vòm hoa. Gốc cây khuất sau lâu đài nên
  // kéo cao thoải mái.
  { id: "garden-trees-far", cls: "sc-g1", style: { width: "130%", left: "-15%", bottom: "38.5%" } },
  { id: "garden-chateau", cls: "sc-g2", style: { width: "100%", left: "0", bottom: "35.5%" } },
  // Sân vườn phải bắc từ chân lâu đài xuống tới mặt bậc thềm, và mép trên của
  // nó phải CHỒNG LÊN mép dưới lâu đài. Ảnh lâu đài gốc kết thúc bằng một
  // đường cắt thẳng (nội dung dừng đột ngột ở 93% chiều cao ảnh) — hụt vài
  // chục pixel là lộ ngay vạch cắt đó nằm vắt ngang giữa khung. Bản thân lớp
  // sân vườn lại có 16.5% chiều cao trên cùng trong suốt, nên phải to hơn
  // tưởng khá nhiều mới với tới.
  { id: "garden-parterre", cls: "sc-g3", style: { width: "190%", left: "-45%", bottom: "15%" } },
];

/**
 * Khung cổng — chỉ có ở màn chào. Lúc mở thiệp cả nhóm này dạt ra khỏi khung
 * theo hướng camera đi tới, như khi ta bước xuyên qua nó.
 *
 * Hai cột kéo cao rời khỏi tỉ lệ gốc (ảnh gốc chỉ cao gấp 3 lần bề ngang, giữ
 * đúng tỉ lệ thì cột lùn tịt so với màn dọc) và đẩy hẳn ra ngoài mép khung nên
 * chỉ còn ló một dải thân; đầu trụ khuất sau rèm và vòm hoa.
 */
const ARCH: Layer[] = [
  { id: "arch-steps", cls: "sc-steps", style: { width: "152%", left: "-26%", bottom: "-2%" } },
  // Rèm vẽ TRƯỚC cột, nên cột nằm đè lên rèm. Thứ tự ngược lại (rèm sau) chỉ
  // đúng ở khung 375 gốc, nơi phần vải đục của rèm chưa với tới cột; khung
  // rộng theo màn hình thì vải trải xa hơn và trùm kín luôn cây cột. Rèm
  // buông phía sau hàng cột cũng là cách treo bình thường.
  {
    id: "arch-curtain-left",
    cls: "sc-curtain sc-curtain--l",
    style: { width: "88%", left: "-14%", top: "-4%" },
  },
  {
    id: "arch-curtain-right",
    cls: "sc-curtain sc-curtain--r",
    style: { width: "88%", right: "-14%", top: "-4%" },
  },
  // THÂN cột chỉ chiếm 31%–69% bề ngang ảnh, hai bên là khoảng trong suốt
  // (đo bằng alpha của arch-column-left.webp). Nên bề rộng đặt ở đây KHÔNG
  // phải bề rộng nhìn thấy: với 19% thì thân thật chỉ còn hơn 30px, lại
  // chừa một quãng trống sát mép màn hình nên trông như cột bị đẩy ra ngoài.
  // 29% / -9% cho thân cột bắt đầu đúng ở mép và rộng chừng 11% màn hình,
  // giữ nguyên tỉ lệ đó ở mọi bề ngang máy.
  {
    id: "arch-column-left",
    cls: "sc-column sc-column--l",
    style: { width: "29%", height: "74%", left: "-9%", bottom: "9%" },
  },
  {
    id: "arch-column-right",
    cls: "sc-column sc-column--r",
    style: { width: "29%", height: "74%", right: "-9%", bottom: "9%" },
  },
  { id: "arch-chandelier", cls: "sc-chandelier", style: { width: "34%", left: "33%", top: "7%" } },
  { id: "arch-flowers-base-left", cls: "sc-bloom sc-bloom--bl", style: { width: "72%", left: "-20%", bottom: "-9%" } },
  { id: "arch-flowers-base-right", cls: "sc-bloom sc-bloom--br", style: { width: "72%", right: "-20%", bottom: "-11%" } },
  // Hai bụi thấp vắt ngang chân khung. Hai bó hoa chân cột chỉ ôm được hai
  // mép, còn lại giữa là một mảng cỏ với bậc thềm trống trơn — chính mảng
  // nhạt đó làm chân màn hình trông hụt.
  { id: "cer-front-left", cls: "sc-bloom sc-verge sc-verge--l", style: { width: "66%", left: "-10%", bottom: "-4%" } },
  { id: "cer-front-right", cls: "sc-bloom sc-verge sc-verge--r", style: { width: "66%", right: "-10%", bottom: "-6%" } },
];

/**
 * Vòm hoa đỉnh — lớp DUY NHẤT đi qua được cả hai màn. Ở màn chào nó là đỉnh
 * cổng, mở xong nó thành hai góc hoa của hero. Giữ nguyên một lớp như vậy thì
 * mắt có một điểm tựa không đổi suốt cú chuyển, cảnh mới không như trang khác.
 */
const CANOPY: Layer[] = [
  { id: "arch-flowers-top-left", cls: "sc-bloom sc-bloom--tl", style: { width: "66%", left: "-6%", top: "-2%" } },
  { id: "arch-flowers-top-right", cls: "sc-bloom sc-bloom--tr", style: { width: "66%", right: "-6%", top: "-2%" } },
];

/**
 * Tiền cảnh — chỉ hiện ra KHI camera tiến tới, đúng như lúc đi tới gần thì
 * những gì ở sát mặt đất mới lọt vào khung.
 *
 * Thân cây nằm ở mép PHẢI của ảnh (79–93% bề ngang), nên muốn gốc cây đứng sát
 * mép trái thì phải lùi cả lớp sang trái gần hết bề ngang của nó.
 */
const FRONT: Layer[] = [
  // bottom âm — bụi hoa LẤN hẳn sang section kế tiếp. Làm được việc này là
  // nhờ .sc giờ cho tràn theo chiều dọc (overflow-y: visible); trước đó mép
  // section xén đứt nên phải để bottom: 0, và bụi hoa kết thúc bằng một
  // đường ngang thẳng băng. Lấn sang thì không còn chỗ nào để thấy đường
  // cắt nữa.
  { id: "garden-bloom-left", cls: "sc-fg sc-fg--l", style: { width: "70%", left: "-30%", bottom: "-7%" } },
  { id: "garden-bloom-right", cls: "sc-fg sc-fg--r", style: { width: "70%", right: "-30%", bottom: "-7%" } },
  // Hai bụi thấp khép kín RÃNH giữa ở sát đáy. Thiếu chúng thì mép dưới
  // section cắt ngang một dải cỏ phẳng — đúng cái vạch thẳng làm hỏng cảnh.
  // Nằm thấp hơn hẳn chỗ cặp đôi đứng nên không che mất hai người.
  { id: "garden-bloom-right", cls: "sc-fg sc-fg--cl", style: { width: "58%", left: "-2%", bottom: "-5%" } },
  { id: "garden-bloom-left", cls: "sc-fg sc-fg--cr", style: { width: "58%", right: "-2%", bottom: "-5%" } },
];

/**
 * Đàn bồ câu bay ngang lúc chuyển cảnh. Mỗi con là HAI tấm chồng lên nhau —
 * cánh giương (dove-2) và cánh cụp (dove-3) — thay nhau hiện bằng
 * `steps(1)`, nên cánh đập thật chứ không phải một tấm ảnh trượt ngang.
 */
const FLOCK = [
  { cls: "sc-bird--1", style: { width: "15%", left: "-22%", top: "46%" } },
  { cls: "sc-bird--2", style: { width: "11%", left: "-30%", top: "33%" } },
  { cls: "sc-bird--3", style: { width: "18%", left: "-16%", top: "58%" } },
  { cls: "sc-bird--4", style: { width: "9%", left: "-38%", top: "25%" } },
  { cls: "sc-bird--5", style: { width: "13%", left: "-26%", top: "68%" } },
];
/**
 * Bồ câu lượn ngang tầm mái lâu đài — nền trời của thiệp là giấy kem, bồ câu
 * trắng thả lên đó thì chìm mất, phải có mái ngói xanh sẫm phía sau mới nổi.
 */
const DOVES: Layer[] = [
  { id: "dove-3", cls: "sc-dove sc-dove--a", style: { width: "12%", left: "6%", top: "39.5%" } },
  { id: "dove-4", cls: "sc-dove sc-dove--b", style: { width: "15%", left: "62%", top: "38.5%" } },
  { id: "dove-2", cls: "sc-dove sc-dove--c", style: { width: "10%", left: "40%", top: "34.5%" } },
];

/** welcome → opening (camera đẩy tới) → open (đã ở trong vườn) */
type Phase = "welcome" | "opening" | "open";

/** Chữ màn chào tan xong mới bắt đầu đẩy camera. */
const TEXT_FADE_MS = 620;
/** Thời lượng cú đẩy camera. */
const PUSH_MS = 3200;

function Layers({ layers, alt }: { layers: Layer[]; alt?: Record<string, string> }) {
  return (
    <>
      {layers.map((layer) => {
        const label = alt?.[layer.id];
        return (
          <Image
            key={layer.cls ?? layer.id}
            src={ART[layer.id].src}
            alt={label ?? ""}
            aria-hidden={label ? undefined : true}
            width={ART[layer.id].w}
            height={ART[layer.id].h}
            loading="eager"
            sizes="(max-width: 640px) 100vw, 640px"
            className={`sc-layer ${layer.cls ?? ""}`}
            style={layer.style}
          />
        );
      })}
    </>
  );
}

// Mặc định `{}` để Hero vẫn gọi được không tham số — route /preview/[id] gom
// các section vào một map `() => ReactNode`, thiếu nó là build TS đứt.
export function Hero({ guestName }: HeroProps = {}) {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [muted, setMuted] = useState(false);
  const timers = useRef<number[]>([]);
  const sceneRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * Đo sẵn chỗ monogram sẽ đáp xuống trong thiệp, rồi ghi vào biến CSS cho
   * chuỗi bay dùng. Tính bằng số đo thật chứ không phỏng chừng bằng %, vì
   * chỗ đứng của nó phụ thuộc chiều cao từng dòng chữ phía trên — đoán sai
   * vài pixel là thấy monogram "nhảy" một cái lúc chữ hiện ra.
   */
  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const measure = () => {
      const slot = scene.querySelector<HTMLElement>(".sc-card-mono");
      const flyer = scene.querySelector<HTMLElement>(".sc-morph-mono");
      const camera = scene.querySelector<HTMLElement>(".sc-camera");
      if (!slot || !flyer || !camera) return;
      // offsetWidth chứ không phải getBoundingClientRect: rect đã dính
      // transform, mà lúc đo thì monogram bay đang ở scale 0.5 — lấy rect ra
      // tỉ lệ 1.0 và nó đáp xuống to bằng cả khối tên.
      if (!slot.offsetWidth || !flyer.offsetWidth) return;

      const s = scene.getBoundingClientRect();
      const t = slot.getBoundingClientRect();
      // Điểm xuất phát là tâm KHUNG CAMERA (một màn hình), không phải tâm
      // section — section cao hơn màn hình nên hai tâm đó lệch nhau.
      const originY = s.top + camera.getBoundingClientRect().height / 2;

      scene.style.setProperty("--mono-dx", `${Math.round(t.left + t.width / 2 - (s.left + s.width / 2))}px`);
      scene.style.setProperty("--mono-dy", `${Math.round(t.top + t.height / 2 - originY)}px`);
      scene.style.setProperty("--mono-scale", (slot.offsetWidth / flyer.offsetWidth).toFixed(3));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.add("intro-locked");
    const pending = timers.current;
    return () => {
      document.body.classList.remove("intro-locked");
      pending.forEach(window.clearTimeout);
    };
  }, []);

  const open = useCallback(() => {
    // MỞ THIỆP TRƯỚC, nhạc tính sau. Thứ tự này không phải tiểu tiết: bản cũ
    // gọi play() trước rồi mới setPhase, mà trong WebKit của iOS play() có
    // phiên bản trả về undefined thay vì Promise — `.catch` gắn vào undefined
    // ném TypeError ngay, handler đứt giữa chừng và thiệp không bao giờ mở.
    // Trên iOS thì Safari, Chrome và webview Zalo dùng chung một WebKit nên
    // hỏng cả ba, trong khi máy bàn vẫn chạy ngon.
    setPhase((current) => {
      if (current !== "welcome") return current;
      timers.current.push(
        window.setTimeout(() => {
          setPhase("open");
          document.body.classList.remove("intro-locked");
        }, TEXT_FADE_MS + PUSH_MS),
      );
      return "opening";
    });

    // Phải nằm trong chính handler của cú bấm thì trình duyệt mới coi là do
    // người dùng khởi động; đẩy xuống setTimeout là bị chặn. Bọc kỹ vì
    // play() có thể ném đồng bộ HOẶC trả về undefined tuỳ máy.
    try {
      const played = audioRef.current?.play();
      if (played && typeof played.catch === "function") {
        played.catch(() => {
          /* Máy chặn tự phát (tiết kiệm pin, cài đặt riêng) — thiệp vẫn mở
             bình thường, chỉ là không có nhạc. */
        });
      }
    } catch {
      /* Như trên. */
    }
  }, []);

  const open3 = phase === "open";

  return (
    <section id="hero" ref={sceneRef} className="sc" data-phase={phase}>
      {/* preload="none": file nhạc 4MB mà tải ngay lúc vào trang thì trên mạng
          di động nó giành băng thông với bundle JS, trang hiện ra nhưng chưa
          hydrate nên bấm nút không ăn. Chỉ nạp khi thật sự bấm. */}
      <audio ref={audioRef} src="/golden-hour.mp4" loop preload="none" />
      {/* Camera: cú đẩy tới nằm ở ĐÂY, một transform duy nhất cho cả cảnh.
          Từng nhóm lớp bên trong còn chuyển động riêng của nó. */}
      <div className="sc-camera">
        <div className="sc-stage">
          <div className="sc-garden">
            <Layers
              layers={GARDEN}
              alt={{ "garden-chateau": "Khu vườn lâu đài của tiệc cưới" }}
            />
            <Layers layers={DOVES} />
          </div>

          {/* Khung cổng nằm trong một nhóm RỘNG BẰNG MÀN HÌNH, không bằng
              sân khấu. Sân khấu có tỉ lệ cố định 375x812 nên trên máy có tỉ
              lệ rộng hơn thế, nó hẹp hơn màn hình và hở ra hai dải giấy ở
              rìa. Khu vườn cứ giữ trong sân khấu để bố cục không méo, còn
              cột, rèm và hai vòm hoa thì bám theo mép màn hình — chúng là
              phần viền nên giãn thêm chút không ảnh hưởng gì, mà bịt kín
              được chỗ hở. Trên máy đúng tỉ lệ 375x812 thì hai khung này
              bằng nhau, không có gì đổi. */}
          <div className="sc-frame">
            <Layers layers={ARCH} />
            <Layers layers={CANOPY} />
          </div>
        </div>
      </div>

      {/* Đàn bồ câu bay ngang màn hình đúng lúc camera đi xuyên qua cổng */}
      <div className="sc-flock" aria-hidden>
        {FLOCK.map((bird) => (
          <span key={bird.cls} className={`sc-bird ${bird.cls}`} style={bird.style}>
            <Image
              src={ART["dove-2"].src}
              alt=""
              width={ART["dove-2"].w}
              height={ART["dove-2"].h}
              sizes="(max-width: 640px) 18vw, 115px"
              className="sc-bird-up"
            />
            <Image
              src={ART["dove-3"].src}
              alt=""
              width={ART["dove-3"].w}
              height={ART["dove-3"].h}
              sizes="(max-width: 640px) 18vw, 115px"
              className="sc-bird-down"
            />
          </span>
        ))}
      </div>

      {/* Tiền cảnh neo theo ĐÁY SECTION chứ không theo khung camera. Section
          cao hơn màn hình một quãng để cảnh vườn còn chỗ kết thúc đàng hoàng
          — bãi cỏ, đài phun nước rồi mới tới bụi hoa tràn qua mép dưới. Neo
          theo camera thì tiền cảnh dính ở mốc 100svh, bỏ trống cả khoảng
          dưới và mép section lại cắt ngang giữa toà nhà. */}
      <div className="sc-front-band" aria-hidden>
        <Layers layers={FRONT} />
        <Image
          src={ART["garden-couple"].src}
          alt=""
          aria-hidden
          width={ART["garden-couple"].w}
          height={ART["garden-couple"].h}
          sizes="(max-width: 640px) 12vw, 78px"
          className="sc-layer sc-couple"
        />
      </div>

      {/* ── Màn 1: lời chào ── */}
      <div className="sc-welcome" aria-hidden={phase !== "welcome"}>
        <div className="sc-plate">
          {/* Nét chỉ chạy một vòng quanh khối chữ rồi khép lại */}
          <svg className="sc-plate-line" viewBox="0 0 320 210" preserveAspectRatio="none" aria-hidden>
            {/* Bốn góc cong LÕM vào (sweep 0) cho ra dáng khung vòm của thiệp
                cổ, không phải một ô chữ nhật bo tròn. */}
            <path
              pathLength="100"
              d="M 20 2 H 300 A 18 18 0 0 0 318 20 V 190 A 18 18 0 0 0 300 208 H 20 A 18 18 0 0 0 2 190 V 20 A 18 18 0 0 0 20 2 Z"
            />
          </svg>
          <p className="eyebrow sc-welcome-eyebrow">Chào mừng đến đám cưới của</p>
          <p className="display-1 sc-welcome-name">{COUPLE.groom}</p>
          <Cross />
          <p className="display-1 sc-welcome-name">{COUPLE.bride}</p>
        </div>

        <button type="button" className="glass-btn sc-open-btn" onClick={open}>
          Mở thiệp
        </button>
      </div>

      {/* Monogram bắc cầu hai màn: hiện lên đúng tâm khối chữ màn chào, bay
          lên và ĐỨNG LẠI đúng chỗ của nó trong thiệp — nó chính là monogram
          của thiệp, không biến mất rồi cho một cái khác hiện ra. Các dòng chữ
          còn lại mới xuất hiện sau khi nó đáp xong. */}
      <Image
        src={MONOGRAM.src}
        alt="Monogram Nhật Quang & Thùy Dung"
        width={MONOGRAM.w}
        height={MONOGRAM.h}
        loading="eager"
        sizes="7.5rem"
        className="sc-morph-mono"
      />

      {/* Nút tắt/bật nhạc — chỉ hiện sau khi thiệp đã mở. Nhạc tự phát mà
          không có chỗ tắt thì khách đang ở chỗ đông người không xoay xở được. */}
      {open3 ? (
        <button
          type="button"
          className="sc-mute"
          aria-pressed={muted}
          onClick={() => {
            const el = audioRef.current;
            if (!el) return;
            el.muted = !el.muted;
            setMuted(el.muted);
          }}
        >
          <span className="sr-only">{muted ? "Bật nhạc" : "Tắt nhạc"}</span>
          <span aria-hidden>{muted ? "♪̸" : "♪"}</span>
        </button>
      ) : null}

      {/* ── Màn 2: thiệp ── */}
      <div className="sc-card" aria-hidden={!open3}>
        {/* Chỗ trống giữ đúng kích thước monogram. Monogram thật là con bay
            từ màn chào tới và ĐỨNG LẠI ở đây — nên ô này luôn trong suốt,
            chỉ có nhiệm vụ chiếm chỗ cho các dòng chữ bên dưới. Nó đứng đầu
            khối chữ, trên cả lời chào. */}
        <div className="w-full">
          <Image
            src={MONOGRAM.src}
            alt=""
            aria-hidden
            width={MONOGRAM.w}
            height={MONOGRAM.h}
            sizes="(max-width: 640px) 13vw, 80px"
            className="sc-card-mono mx-auto block h-auto w-[13%] max-w-[4.75rem]"
          />
        </div>

        <Reveal className="mt-[var(--space-3)] max-w-[17.5rem]" when={open3}>
          <p className="guest-line">
            {HERO.greeting}, {guestName?.trim() || HERO.guest}
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-3 max-w-[19rem]" when={open3}>
          <p className="invite-line">{HERO.invite}</p>
        </Reveal>

        <Reveal delay={3} className="mt-[var(--space-4)]" when={open3}>
          <h1 className="display-1 display-1--shine">{COUPLE.groom}</h1>
        </Reveal>

        <Reveal delay={3} className="my-2" when={open3}>
          <Cross />
        </Reveal>

        <Reveal delay={3} when={open3}>
          <p className="display-1 display-1--shine display-1--shine-late">{COUPLE.bride}</p>
        </Reveal>

        <Reveal delay={4} className="mt-5" when={open3}>
          <p className="date-text date-text--hero">{COUPLE.dateDisplay}</p>
        </Reveal>

        <Reveal delay={5} className="mt-3" when={open3}>
          <p className="eyebrow">{COUPLE.city}</p>
        </Reveal>
      </div>
    </section>
  );
}
