import { TimeVenue } from "@/components/sections/TimeVenue";
import { Agenda } from "@/components/sections/Agenda";
import { Artists } from "@/components/sections/Artists";
import { Dresscode } from "@/components/sections/Dresscode";
import { Rsvp, type RsvpGuest } from "@/components/sections/Rsvp";
import { FlowerDivider } from "@/components/FlowerDivider";
import { PARTIES } from "@/lib/content";

/**
 * Phần thân thiệp: Thời gian & Địa điểm → Chương trình → Nghệ sĩ → Dresscode → RSVP.
 *
 * Đám cưới chỉ còn một buổi tiệc, nên ở đây không còn nút chuyển buổi và cũng
 * không cần state — toàn bộ thân thiệp render trên server.
 *
 * `guest` có khi thiệp mở bằng link riêng: form RSVP điền sẵn tên và ghi phản
 * hồi vào đúng hàng của khách đó trong Google Sheet.
 */
export function Party({ guest }: { guest?: RsvpGuest } = {}) {
  return (
    <>
      {/* Không có dải hoa sau Thời gian & Địa điểm: section đó đã kết bằng
          tranh lễ đường, thêm dải hoa nữa là hai lớp trang trí chồng nhau. */}
      <TimeVenue party={PARTIES.main} />
      <Agenda />
      <Artists />
      <FlowerDivider id="flower-divider-b" />
      <Dresscode />
      <Rsvp party={PARTIES.main} guest={guest} />
    </>
  );
}
