# Portfolio AI Filmmaker — React + Vite

Project này đã được module hoá từ file HTML gốc sang React để deploy lên Vercel.

## Cấu trúc

```txt
portfolio-react/
├── public/
│   ├── favicon.svg
│   └── og-image.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── FilmCard.jsx
│   │   ├── FilmModal.jsx
│   │   ├── Navbar.jsx
│   │   └── Reveal.jsx
│   ├── data/
│   │   └── films.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vercel.json
└── .npmrc
```

## Chạy local

```bash
npm install
npm run dev
```

Mở link Vite hiện ra, thường là `http://localhost:5173`.

## Deploy Vercel

1. Upload nguyên folder này lên GitHub.
2. Vào Vercel → Add New Project → Import GitHub repo.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Deploy.

## Để link gửi đi hiện preview như ảnh bạn gửi

Mình đã thêm sẵn Open Graph / Twitter Card trong `index.html`:

- `og:title`
- `og:description`
- `og:image`
- `twitter:card`

Sau khi deploy, mở `index.html` và đổi các dòng này từ:

```html
https://your-portfolio.vercel.app/
https://your-portfolio.vercel.app/og-image.svg
```

thành domain Vercel thật của bạn, ví dụ:

```html
https://ten-project-cua-ban.vercel.app/
https://ten-project-cua-ban.vercel.app/og-image.svg
```

Sau đó deploy lại. Khi gửi link qua Facebook/Zalo/Messenger, preview sẽ lấy title, mô tả và ảnh `og-image.svg`.

## Sửa nội dung portfolio

- Sửa danh sách phim, ảnh, YouTube ID, mô tả: `src/data/films.js`
- Sửa thông tin cá nhân, email, số điện thoại: `src/App.jsx`
- Sửa giao diện/CSS: `src/styles.css`
- Sửa ảnh preview khi gửi link: `public/og-image.svg`


## Link preview / banner khi gửi link

Project đã trỏ Open Graph image về `/img/banner.png`. Sau khi deploy Vercel, mở `index.html` và đổi `https://your-portfolio.vercel.app` thành domain thật của bạn, ví dụ:

```html
<meta property="og:url" content="https://ten-domain-cua-ban.vercel.app/" />
<meta property="og:image" content="https://ten-domain-cua-ban.vercel.app/img/banner.png" />
<meta name="twitter:image" content="https://ten-domain-cua-ban.vercel.app/img/banner.png" />
```

Sau đó deploy lại. Facebook/Zalo/Messenger sẽ lấy banner từ `public/img/banner.png`.
