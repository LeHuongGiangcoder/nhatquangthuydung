"use client";

import { useState, type FormEvent } from "react";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { PARTIES, type Party } from "@/lib/content";
import { RSVP } from "@/lib/rsvp";

type Attending = "yes" | "no";

/**
 * Số người đi — khách gõ số để cột "Số người" trong Sheet cộng được tổng.
 * Trần 20 cho một hồi âm: cao hơn gần như chỉ là gõ nhầm.
 */
const MAX_PARTY_SIZE = 20;

type RsvpProps = { party?: Party };

export function Rsvp({ party = PARTIES.main }: RsvpProps = {}) {
  const [attending, setAttending] = useState<Attending>("yes");
  // Giữ nguyên chuỗi khách gõ: xoá trắng ô để gõ lại số khác là chuyện bình
  // thường, ép về số ngay thì con trỏ nhảy hoặc ô tự nhảy về 1.
  const [partySize, setPartySize] = useState("1");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const form = new FormData(e.currentTarget);
    const isComing = attending === "yes";
    const count = Number(partySize);
    const withCompanions = isComing && count > 1;

    if (isComing && (!Number.isInteger(count) || count < 1 || count > MAX_PARTY_SIZE)) {
      setError(`Số người tham dự nhập từ 1 đến ${MAX_PARTY_SIZE} giúp chúng mình nhé.`);
      return;
    }

    setSending(true);
    setError(null);

    try {
      // Ô bẫy ẩn trong form: người thật không thấy nên không điền, bot điền
      // hết mọi ô. Coi như gửi thành công nhưng không ghi gì vào Sheet.
      if (String(form.get("website") ?? "").trim()) {
        setSent(true);
        return;
      }

      // Hub là Apps Script: text/plain để trình duyệt không gửi preflight
      // CORS (Apps Script không trả lời được preflight).
      const res = await fetch(RSVP.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          client: RSVP.client,
          name: String(form.get("name") ?? "").trim(),
          attending: isComing,
          guests: isComing ? count : "",
          companions: withCompanions ? String(form.get("companions") ?? "").trim() : "",
          message: String(form.get("message") ?? "").trim(),
        }),
      });
      const data: { ok?: boolean } | null = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setError(
        "Chưa gửi được phản hồi, bạn thử lại giúp chúng mình nhé. Nếu vẫn không được, hãy nhắn trực tiếp cho cô dâu chú rể.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="rsvp" className="section section--fit section--bleed section--lily relative">
      {/* Cành hoa rum ôm góc trên trái: hoa vắt ngang phía trên tiêu đề, thân
          thả dọc mép trái rồi lẩn sau tấm giấy của form (decor z-0 dưới nội
          dung z-2) — như họa tiết góc của một tấm menu in. */}
      <Decor id="rsvp-lily" width="60%" top="1rem" left="0" className="motion-sway" />

      {/* `front` để hai đài hoa nằm trên tấm giấy của form (z-3 > .section-inner
          z-2) — không có nó thì tấm giấy che mất chân hoa. */}
      <Decor id="el-18" width="36%" bottom="0%" left="-10%" front />
      <Decor id="el-18" width="36%" bottom="0%" right="-10%" flip front />

      <div className="section-inner">
        <Reveal className="section-head">
          <HeadArt id="el-ring-box" height="4.75rem" />
          <p className="eyebrow">Xác nhận tham dự</p>
          <h2 className="display-2">Hồi âm</h2>
          <p className="eyebrow eyebrow--tight">{party.tab}</p>
          <Divider />
        </Reveal>

        {/* key riêng cho hai tấm: không có key thì React dùng lại cùng một Reveal
            cho cả form lẫn lời cảm ơn, tấm cảm ơn không có hiệu ứng hiện riêng. */}
        {sent ? (
          <Reveal key="sent" className="paper-panel center stack">
            <h3 className="display-3">Đã nhận được rồi!</h3>
            <p className="body-text">
              Cảm ơn bạn đã dành thời gian phản hồi. Chúng mình mong sớm được
              gặp bạn trong ngày trọng đại.
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setSent(false)}
              >
                Gửi phản hồi khác
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal key="form" delay={1}>
            {/* Form nằm trên một tấm giấy riêng: mắt bám ngay vào khối cần
                điền thay vì trôi giữa nền giấy chung của cả section. */}
            <form className="paper-panel stack" onSubmit={handleSubmit}>
              <div className="field">
                <label className="field-label" htmlFor="rsvp-name">
                  Họ và tên
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  className="input"
                  placeholder="Nguyễn Văn A"
                  maxLength={120}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <span className="field-label">Bạn sẽ tham dự chứ?</span>
                <div className="choice-group">
                  <button
                    type="button"
                    className="choice"
                    aria-pressed={attending === "yes"}
                    onClick={() => setAttending("yes")}
                  >
                    Có, chắc chắn
                  </button>
                  <button
                    type="button"
                    className="choice"
                    aria-pressed={attending === "no"}
                    onClick={() => setAttending("no")}
                  >
                    Rất tiếc
                  </button>
                </div>
              </div>

              {attending === "yes" && (
                <div className="field">
                  <label className="field-label" htmlFor="rsvp-guests">
                    Số người tham dự
                  </label>
                  <input
                    id="rsvp-guests"
                    name="guests"
                    className="input input--count"
                    type="number"
                    // Bàn phím số trên điện thoại; type="number" một mình vẫn
                    // mở bàn phím chữ trên một số máy Android.
                    inputMode="numeric"
                    min={1}
                    max={MAX_PARTY_SIZE}
                    step={1}
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    required
                  />
                </div>
              )}

              {attending === "yes" && Number(partySize) > 1 && (
                <div className="field">
                  <label className="field-label" htmlFor="rsvp-companions">
                    Điền tên người đi cùng
                  </label>
                  <textarea
                    id="rsvp-companions"
                    name="companions"
                    className="input input--short"
                    placeholder="VD: Nguyễn Văn B, Trần Thị C"
                    maxLength={300}
                    rows={2}
                    required
                  />
                </div>
              )}

              <div className="field">
                <label className="field-label" htmlFor="rsvp-message">
                  Lời chúc gửi cô dâu chú rể
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  className="input"
                  placeholder="Chúc hai bạn trăm năm hạnh phúc…"
                  maxLength={1000}
                />
              </div>

              {/* Ô bẫy chống spam: ẩn khỏi người dùng và trình đọc màn hình,
                  chỉ bot điền vào. Phản hồi có ô này không được gửi đi. */}
              <div className="rsvp-trap" aria-hidden>
                <label htmlFor="rsvp-website">Website</label>
                <input
                  id="rsvp-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error ? (
                <p className="rsvp-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="btn-row pt-2">
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={sending}
                >
                  {sending ? "Đang gửi…" : "Gửi xác nhận"}
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
