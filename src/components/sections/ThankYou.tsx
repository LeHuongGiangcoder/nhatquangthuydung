import Image from "next/image";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { Reveal } from "@/components/Reveal";
import { ART } from "@/lib/layers";

/** Vị trí các đốm lấp lánh quanh hai chiếc ô, tính theo khung .ty-couple. */
const SPARKS = [
  { top: "6%", left: "8%", size: "0.8rem", delay: "0s" },
  { top: "2%", left: "38%", size: "0.56rem", delay: "0.35s" },
  { top: "14%", left: "66%", size: "0.7rem", delay: "0.9s" },
  { top: "26%", left: "92%", size: "0.5rem", delay: "1.5s" },
  { top: "34%", left: "4%", size: "0.62rem", delay: "2.1s" },
  { top: "44%", left: "80%", size: "0.8rem", delay: "2.7s" },
  { top: "52%", left: "22%", size: "0.54rem", delay: "3.4s" },
  { top: "20%", left: "52%", size: "0.46rem", delay: "4.1s" },
];

/**
 * Cảm ơn — cặp đôi dưới hai chiếc ô "Mr." và "Mrs." quay chậm, lấp lánh
 * quanh vành ô.
 *
 * Ba lớp tách rời chứ không dùng bản gộp cũ (el-umbrellas): có tách thì ô mới
 * quay được quanh tâm của chính nó trong khi người đứng yên.
 */
export function ThankYou() {
  return (
    <section
      id="thank-you"
      /* pb-44: dải bụi hoa chân section cao ~7rem, nhưng chừa đúng bằng đó thì
         dòng chữ cuối nằm sát ngay trên ngọn lá. Chừa rộng gấp rưỡi để khối
         chữ có chỗ thở. */
      className="section section--fit relative overflow-hidden pb-44"
    >
      {/* Bụi hoa trắng chân section: hai lớp lệch nhau cho dày, lớp sau lật
          gương và tụt xuống để không lộ ra là cùng một dải lặp lại.
          Hai đầu dải el-54-strip được vuốt trong suốt khoảng 4% mỗi bên, nên
          mỗi lớp phải thò ra ngoài hai mép nhiều hơn thế. */}
      <Decor id="el-54-strip" width="152%" bottom="-7%" left="-28%" flip className="motion-breeze motion-breeze--slow" />
      <Decor id="el-54-strip" width="130%" bottom="-2%" left="-15%" className="motion-breeze" />

      {/* Đàn bướm vàng: bay vào theo cuộn rồi chao lượn tại chỗ, cùng cách
          làm với bồ câu ở hero. */}
      <Decor id="el-46" width="38%" bottom="15%" left="-2%" className="ty-flutter" />

      <div className="section-inner flex flex-col items-center text-center">
        <Reveal>
          <div className="ty-couple">
            <Image
              src={ART["thanks-couple"].src}
              alt="Minh hoạ cô dâu chú rể"
              width={ART["thanks-couple"].w}
              height={ART["thanks-couple"].h}
              sizes="(max-width: 640px) 62vw, 260px"
              className="ty-couple-art"
            />

            <Image
              src={ART["thanks-parasol-mr"].src}
              alt=""
              aria-hidden
              width={ART["thanks-parasol-mr"].w}
              height={ART["thanks-parasol-mr"].h}
              sizes="(max-width: 640px) 52vw, 220px"
              className="ty-parasol ty-parasol--mr"
            />
            <Image
              src={ART["thanks-parasol-mrs"].src}
              alt=""
              aria-hidden
              width={ART["thanks-parasol-mrs"].w}
              height={ART["thanks-parasol-mrs"].h}
              sizes="(max-width: 640px) 50vw, 210px"
              className="ty-parasol ty-parasol--mrs"
            />

            {SPARKS.map((s, i) => (
              <span
                key={i}
                className="ty-spark"
                aria-hidden
                style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={1} className="section-head mt-[var(--space-4)]">
          <p className="eyebrow">Thay lời kết</p>
          <h2 className="display-2">Cảm ơn bạn</h2>
          <Divider />
        </Reveal>

        <Reveal delay={2}>
          <p className="body-text center text-balance">
            Sự hiện diện của bạn là món quà ý nghĩa nhất với chúng mình. Cảm ơn
            vì đã đồng hành và chúc phúc cho chặng đường phía trước.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
