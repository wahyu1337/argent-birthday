# 🎂 Birthday Site

Website ucapan ulang tahun yang elegan, dibangun dengan **Webpack 5**, HTML murni, CSS modular, dan JavaScript ES6 modules.

---

## 📁 Struktur Project

```
birthday-site/
├── src/
│   ├── index.html          ← Template HTML utama
│   ├── css/
│   │   └── styles.css      ← Semua styling (CSS Variables, responsive)
│   └── js/
│       ├── main.js         ← Entry point + CONFIG
│       ├── confetti.js     ← Particle system (canvas)
│       ├── counter.js      ← Animasi penghitung usia
│       └── animations.js   ← Scroll-reveal (IntersectionObserver)
├── dist/                   ← Output build (di-generate, jangan diedit)
├── webpack.config.js
├── package.json
├── .babelrc
└── .gitignore
```

---

## 🚀 Cara Mulai

### 1. Install dependencies
```bash
npm install
```

### 2. Development (hot reload)
```bash
npm run dev
```
Buka browser di `http://localhost:3000`

### 3. Build untuk production
```bash
npm run build
```
Output ada di folder `dist/` — siap deploy.

---

## ✏️ Personalisasi

Edit blok `CONFIG` di `src/js/main.js`:

```js
const CONFIG = {
  recipientName: 'Nama Temanmu',       // Nama yang tampil di hero
  birthDate: new Date('2000-06-15'),   // Tanggal lahir (untuk counter akurat)
  autoConfetti: true,                  // Confetti otomatis saat load
};
```

---

## 🌐 Deploy ke GitHub Pages

### Langkah 1 — Push ke GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Langkah 2 — Install gh-pages (sudah ada di devDeps)
```bash
npm run deploy
```

Perintah ini otomatis:
1. Menjalankan `npm run build`
2. Push folder `dist/` ke branch `gh-pages`

### Langkah 3 — Aktifkan di GitHub
1. Buka repo → **Settings** → **Pages**
2. Source: **Deploy from a branch** → pilih `gh-pages` → `/ (root)`
3. Save → tunggu ~1 menit → site live di `https://USERNAME.github.io/REPO/`

> **Catatan:** Jika repo bukan di root (misalnya `github.io/birthday-site/`),
> ubah `publicPath` di `webpack.config.js` dari `'./'` menjadi `'/birthday-site/'`.

---

## 🛠️ Scripts

| Perintah           | Fungsi                              |
|--------------------|-------------------------------------|
| `npm run dev`      | Development server + hot reload     |
| `npm run build`    | Build production ke `dist/`         |
| `npm run deploy`   | Build + push ke GitHub Pages        |

---

## 🎨 Teknologi

- **Webpack 5** — Bundler + asset pipeline
- **Babel** — ES6+ transpilation
- **HtmlWebpackPlugin** — Inject bundle ke HTML
- **MiniCssExtractPlugin** — CSS terpisah di production
- **IntersectionObserver** — Scroll animations
- **Canvas API** — Confetti particle system
- **CSS Custom Properties** — Theming & responsiveness
- **Google Fonts** — Playfair Display + DM Sans
