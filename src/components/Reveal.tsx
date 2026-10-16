"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** 1–5, tương ứng .reveal-d1 … .reveal-d5 */
  delay?: 1 | 2 | 3 | 4 | 5;
  as?: ElementType;
  className?: string;
  /**
   * Cổng chặn: để `false` thì giữ nguyên trạng thái ẩn dù đã lọt vào khung
   * nhìn. Dùng cho khối chữ của thiệp — nó nằm sẵn trong DOM suốt màn chào
   * nên observer báo "đã thấy" ngay, chữ sẽ hiện trước cả lúc mở cổng.
   */
  when?: boolean;
};

/** Bọc nội dung để fade-up khi cuộn tới. Style nằm trong globals.css (.reveal). */
export function Reveal({
  children,
  delay,
  as: Tag = "div",
  className = "",
  when = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // Trạng thái "đã hiện" nằm trong React chứ không gắn class thẳng vào DOM.
  // Gắn bằng classList thì lần render sau React ghi đè lại className và xoá
  // mất is-visible — phần tử mờ dần về 0 ngay trước mắt khách. Đó chính là lỗi
  // thông báo "Đã nhận được rồi!" hiện lên rồi biến mất sau khi gửi RSVP.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible || !when) return;

    let reported = false;
    const io = new IntersectionObserver(
      (entries) => {
        reported = true;
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);

    // Lưới an toàn: observer luôn báo một lần ngay sau observe(), kể cả khi
    // phần tử nằm ngoài màn hình. Chỉ khi không báo gì sau 1.5s (trình duyệt
    // lạ, observer hỏng) mới hiện thẳng nội dung.
    const fallback = window.setTimeout(() => {
      if (reported) return;
      setVisible(true);
      io.disconnect();
    }, 1500);

    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, [visible, when]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${delay ? `reveal-d${delay}` : ""} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
