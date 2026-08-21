# Perjalanan Magang di Afila — Afila Media Karya × UNM

Presentasi interaktif 3 bulan magang: otomasi **n8n**, **Gunaku AI**, **Rumah Keripik**, dan pembelajaran industri. Dibangun sebagai web app slide deck modern (bukan PowerPoint statis).

🔗 **Live:** https://presentasi-magang.vercel.app  
📂 **Repo:** https://github.com/Hengki-Setiawan/presentasi-magang

![cover](public/assets/logo-afila.png)

## ✨ Fitur

- 9 slide data-driven (`src/slides.tsx:607`) - cover, seleksi, fase 1-3, galeri, kesan, skill, penutup
- Navigasi keyboard (← → Home End Space), swipe touch, dots, overview grid (O), hash routing (`#cover`, `#fase-2`)
- Speaker Notes + Timer (N), Auto-play 8s (P), Sound FX WebAudio (M), Fullscreen (F), Copy link (C), Shortcuts help (?/H)
- MediaSlot drag&drop + IndexedDB persist (`src/components/MediaSlot.tsx:14`)
- Animasi Framer Motion, tema navy `#35459c` + gold `#f5b93b` + cream `#fffdf4`, font Sora + Plus Jakarta Sans
- SEO lengkap: OG/Twitter, sitemap, robots.txt, `lang="id"`

## 🛠️ Stack

Vite 6 + React 19 + TypeScript 5.7 + Tailwind 3.4 + Framer Motion 12 + lucide-react + IndexedDB

## 🚀 Cara Jalan

```bash
# Node 20 (lihat .nvmrc)
nvm use        # atau fnm use
npm install
npm run dev    # http://localhost:3000
npm run build  # tsc -b + vite build
npm run preview
npm run typecheck
npm run lint
```

## 📁 Struktur

```
src/
  App.tsx              Shell: state index/direction, autoplay, timer, hash sync
  slides.tsx           9 komponen slide + slideDeckData
  components/
    MediaSlot.tsx      Upload image/video -> IndexedDB
    SpeakerNotesModal.tsx
    ShortcutsModal.tsx
  lib/
    soundFx.ts         Web Audio synth (no mp3)
    mediaStorage.ts    IndexedDB helper
public/assets/         logo-afila.png, logo-unm.png
vercel.json            headers immutable, SPA rewrites, security
```

## ⌨️ Shortcuts

| Tombol | Aksi |
|---|---|
| → / Space / PgDn | Next |
| ← / PgUp | Prev |
| Home / End | First / Last |
| O | Overview grid |
| N | Speaker notes & timer |
| P | Auto-play |
| M | Mute SFX |
| F | Fullscreen |
| C | Copy slide link |
| ? / H | Help |

## 🚢 Deploy (Vercel)

- Framework: Vite, Build: `npm run build`, Output: `dist`
- `vercel.json` sudah set `cleanUrls`, cache 1 tahun untuk `/assets/*`, SPA `rewrites` ke `index.html`
- Env: tidak butuh - semua client-side

## 📝 Lisensi

MIT - silakan fork untuk presentasi magang lain.
