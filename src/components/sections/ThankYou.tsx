import Image from "next/image";
import { Decor } from "@/components/Decor";
import { Divider } from "@/components/Divider";
import { HeadArt } from "@/components/HeadArt";
import { Reveal } from "@/components/Reveal";
import { COUPLE, MONOGRAM } from "@/lib/content";

/** Thank you — Mr. & Mrs. dưới hai chiếc ô mở đầu, phần còn lại để trống cho thoáng. */
export function ThankYou() {
  return (
    <section
      id="thank-you"
      /* pb-28: chừa sẵn chỗ cho dải bụi hoa cao ~7rem ở chân section — không
         có nó thì dải hoa đè lên dòng cuối khi section co theo nội dung. */
      className="section section--fit relative overflow-hidden pb-28"
    >
      {/* Bụi hoa trắng chân section: hai lớp lệch nhau cho dày, lớp sau lật
          gương và tụt xuống để không lộ ra là cùng một dải lặp lại.
          Hai đầu dải el-54-strip được vuốt trong suốt khoảng 4% mỗi bên, nên
          mỗi lớp phải thò ra ngoài hai mép nhiều hơn thế. */}
      <Decor id="el-54-strip" width="152%" bottom="-7%" left="-28%" flip className="motion-breeze motion-breeze--slow" />
      <Decor id="el-54-strip" width="130%" bottom="-2%" left="-15%" className="motion-breeze" />
      <Decor id="el-46" width="34%" bottom="16%" left="0%" />

      <div className="section-inner flex flex-col items-center text-center">
        <Reveal className="section-head">
          <HeadArt id="el-umbrellas" height="8rem" />
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

        <Reveal delay={3} className="mt-8 flex flex-col items-center gap-3">
          <span className="rule !h-8" />
          <Image
            src={MONOGRAM.src}
            alt="Monogram Nhật Quang & Thùy Dung"
            width={MONOGRAM.w}
            height={MONOGRAM.h}
            sizes="3.25rem"
            className="block h-auto w-[3.25rem]"
          />
          <p className="date-text date-text--hero">{COUPLE.dateDisplay}</p>
          <p className="eyebrow">{COUPLE.city}</p>
        </Reveal>
      </div>
    </section>
  );
}
