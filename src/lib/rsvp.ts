/**
 * RSVP đi về Glow RSVP Hub — một Apps Script dùng chung cho mọi site Glow,
 * ghi vào Google Sheet riêng của từng client theo `client` bên dưới.
 *
 * Hub URL là công khai (không có secret nào trong site), nên form gọi thẳng
 * từ trình duyệt. Sheet của khách: xem docs/RSVP_SETUP.md.
 */
export const RSVP = {
  mode: "general",
  endpoint:
    "https://script.google.com/macros/s/AKfycbxB9Oc65toi-UmEfTB_J6d3l8LQoNQvhpyY1IaIIKR2h8I59K1NxvCGTZckTqLaT5y_/exec",
  client: "nhatquangthuydung",
} as const;
