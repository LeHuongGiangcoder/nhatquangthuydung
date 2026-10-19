# RSVP — Glow RSVP Hub

Phản hồi RSVP của site đi về **Glow RSVP Hub**, một Apps Script dùng chung cho
mọi site Glow. Hub ghi vào Google Sheet riêng của client này.

- Client: `nhatquangthuydung`
- Chế độ: **general** — một form mở, ai có link site cũng trả lời được
- Sheet: https://docs.google.com/spreadsheets/d/1wwdVaO-JN3nIfDFtMGSzeBj0HAfmC8zo2JHuUb_3R2Q/edit
- Cấu hình trong site: `src/lib/rsvp.ts` (hub URL công khai, không có secret)

## Cột trong Sheet

| Cột | Từ trường | Giá trị |
|-----|-----------|---------|
| Tên khách | `name` | khách tự gõ |
| Tham dự | `attending` | `Có` / `Không` |
| Số người | `guests` | số khách gõ, 1–20 (số thật để cộng tổng được) |
| Người đi cùng | `companions` | tên người đi cùng, chỉ khi số người > 1 |
| Lời chúc | `message` | lời chúc của khách |

Hub tự thêm cột thời điểm trả lời. Đừng đổi tên tiêu đề cột: đổi rồi thì phản
hồi của trường đó rơi vào một cột mới mang tên cũ.

## Form gửi gì

`src/components/sections/Rsvp.tsx` POST thẳng tới hub, `Content-Type:
text/plain;charset=utf-8` (Apps Script không trả lời được preflight CORS). Body
là một object phẳng: `client` + các trường ở bảng trên. Ô `website` trong form
là bẫy chống spam — có chữ trong đó thì form không gửi gì đi.

## Khi form đổi trường

Thêm hoặc đổi tên trường thì khai lại nhãn cột:

```bash
~/glow-tools/glow-rsvp.sh fields nhatquangthuydung --fields "phone=SĐT"
```

Quên bước này cũng không mất phản hồi: hub lưu trường lạ vào cột mới mang tên
khoá thô.

## Link riêng cho khách

`/main/<slug>` vẫn mở được thiệp và không bị index, dùng để gửi riêng cho từng
khách. Ở chế độ general thiệp không chào theo tên và phản hồi không ghép theo
slug — mỗi lượt trả lời là một hàng mới trong Sheet.
