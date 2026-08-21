import { motion, type Variants } from 'framer-motion'
import {
  Sparkles,
  Users,
  FileCode2,
  ClipboardCheck,
  Rocket,
  Bot,
  Database,
  MessageSquare,
  Wrench,
  ArrowRightLeft,
  Flag,
  Map,
  ShoppingBag,
  Quote,
  Heart,
  GraduationCap,
  Workflow,
  Bug,
  Webhook,
  BrainCircuit,
  TestTube2,
  Network,
  LayoutGrid,
  Split,
  Route,
  Search,
} from 'lucide-react'
import { MediaSlot } from '@/components/MediaSlot'

/* ---------------- shared motion ---------------- */

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}

export const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
}

const float = (delay = 0, dur = 6) => ({
  animate: { y: [0, -16, 0], rotate: [0, 6, 0] },
  transition: { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' as const },
})

/* ---------------- decorations ---------------- */

export function Decorations({ variant = 0 }: { variant?: number }) {
  const v = variant % 3
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="grid-pattern absolute inset-0" />
      {/* Afila-style geometric elements */}
      <motion.div
        {...float(0, 7)}
        className="absolute left-[6%] top-[12%] h-0 w-0 border-b-[46px] border-l-[30px] border-r-[30px] border-b-[#f5b93b]/70 border-l-transparent border-r-transparent"
      />
      <motion.div
        {...float(1.2, 8)}
        className="absolute right-[8%] top-[18%] h-0 w-0 rotate-180 border-b-[40px] border-l-[26px] border-r-[26px] border-b-[#35459c]/60 border-l-transparent border-r-transparent"
      />
      <motion.div
        {...float(0.6, 9)}
        className={`absolute bottom-[14%] h-24 w-24 rounded-full border-[10px] border-[#f5b93b]/30 ${v === 1 ? 'left-[10%]' : 'right-[12%]'}`}
      />
      <motion.div
        {...float(2, 7.5)}
        className={`absolute top-[55%] h-14 w-14 rounded-2xl bg-[#35459c]/10 ${v === 2 ? 'left-[4%]' : 'left-[85%]'}`}
      />
      <motion.div
        {...float(1.6, 6.5)}
        className="absolute bottom-[8%] left-[45%] text-[#f5b93b]/60"
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>
      <motion.div
        {...float(0.3, 10)}
        className="absolute right-[30%] top-[8%] h-3 w-3 rounded-full bg-[#35459c]/40"
      />
      <motion.div
        {...float(2.4, 8.5)}
        className="absolute bottom-[30%] left-[8%] h-2.5 w-2.5 rounded-full bg-[#f5b93b]"
      />
    </div>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={item}
      className="inline-flex items-center gap-2 self-start rounded-full border border-[#35459c]/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#35459c] shadow-sm backdrop-blur"
    >
      <span className="h-2 w-2 rounded-full bg-[#f5b93b]" />
      {children}
    </motion.span>
  )
}

/* ---------------- Slide 1 : Cover ---------------- */

export function SlideCover() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-6 text-center"
    >
      <motion.div variants={item} className="mb-6 flex items-center gap-5 md:mb-8 md:gap-6">
        <motion.img
          src="/assets/logo-afila.png"
          alt="Logo Afila Media Karya"
          width={96}
          height={96}
          fetchPriority="high"
          decoding="async"
          className="h-16 w-16 rounded-3xl bg-white object-contain p-2 card-glow md:h-24 md:w-24"
          whileHover={{ scale: 1.08, rotate: -3 }}
        />
        <motion.div variants={item} className="h-10 w-px bg-[#35459c]/20 md:h-12" />
        <motion.img
          src="/assets/logo-unm.png"
          alt="Logo Universitas Negeri Makassar"
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          className="h-16 w-16 rounded-full bg-white object-contain p-1.5 card-glow md:h-24 md:w-24"
          whileHover={{ scale: 1.08, rotate: 3 }}
        />
      </motion.div>

      <motion.p variants={item} className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#35459c]/70 md:mb-4 md:text-sm">
        Laporan Presentasi Magang
      </motion.p>

      <motion.h1 variants={item} className="font-display max-w-4xl text-4xl font-extrabold leading-[1.08] text-[#2c3670] sm:text-5xl md:text-7xl">
        Perjalanan <span className="shine">Magang</span> Saya di Afila
      </motion.h1>

      <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-[#35459c]/80 md:mt-6 md:text-xl">
        Ringkasan 3 bulan magang: belajar bikin otomasi, ikut mengerjakan beberapa proyek, dan melihat cara kerja tim di industri.
      </motion.p>

      <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#35459c]/70 md:mt-10 md:gap-3 md:text-sm">
        <span className="rounded-full bg-[#35459c] px-4 py-1.5 text-white shadow-sm">Afila Media Karya</span>
        <span>×</span>
        <span className="rounded-full border border-[#35459c]/30 bg-white/80 px-4 py-1.5 shadow-sm">Universitas Negeri Makassar</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#35459c]/50"
      >
        Tekan → atau klik tombol navigasi
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-7 w-4 rounded-full border-2 border-[#35459c]/40 p-0.5">
          <div className="h-1.5 w-full rounded-full bg-[#f5b93b]" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- Slide 2 : Alasan masuk ---------------- */

export function SlideAlasan() {
  const cards = [
    {
      icon: Users,
      title: 'Ajakan & Peluang Awal',
      desc: 'Dapat info magang Afila dari teman kampus, lalu coba daftar untuk lihat proses kerja di industri.',
    },
    {
      icon: FileCode2,
      title: 'Tes Hari ke-1: Prototype SIAKAP',
      desc: 'Hari pertama bikin prototype web SIAKAP sederhana (HTML/CSS/layout) dengan batas waktu.',
    },
    {
      icon: ClipboardCheck,
      title: 'Tes Hari ke-2: Logika Absen Azka',
      desc: 'Hari kedua bikin alur logika absensi Azka untuk lihat cara berpikir dan menyelesaikan masalah.',
    },
  ]
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>Awal Masuk &amp; Seleksi</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        Bagaimana Saya <span className="text-[#e9a313]">Masuk?</span>
      </motion.h2>
      <motion.p variants={item} className="mt-3 max-w-3xl text-base text-[#35459c]/75 md:text-lg">
        Sebelum resmi memulai magang, saya melalui proses seleksi teknis selama <b className="text-[#2c3670]">2 hari</b> untuk menguji pemahaman logika, kecepatan adaptasi, dan kesiapan mengerjakan kebutuhan tim.
      </motion.p>

      <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            variants={item}
            whileHover={{ y: -6 }}
            className="card-glow relative overflow-hidden rounded-3xl border border-[#35459c]/10 bg-white/85 p-6 backdrop-blur"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#f5b93b]/20" />
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[#35459c] to-[#4a5dbb] p-3 text-white shadow-md">
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#2c3670]">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#35459c]/70">{c.desc}</p>
            <span className="font-display absolute bottom-3 right-4 text-3xl font-extrabold text-[#35459c]/10">0{i + 1}</span>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="flex items-center gap-4 rounded-3xl border border-[#f5b93b]/40 bg-[#f5b93b]/15 p-5">
          <span className="shrink-0 rounded-2xl bg-white/90 p-3 shadow-sm">
            <Rocket className="h-7 w-7 text-[#e9a313]" />
          </span>
          <p className="text-sm font-semibold leading-relaxed text-[#2c3670]">
            Setelah dua hari tes, dapat feedback yang cukup oke dari mentor dan diterima magang selama 3 bulan.
          </p>
        </div>
        <MediaSlot id="slot-alasan-tes" kind="image" label="Foto / Screenshot hasil tes 2 hari" ratio="16/7" />
      </motion.div>
    </motion.div>
  )
}

/* ---------------- Timeline Component ---------------- */

interface WeekItem {
  week: string
  title: string
  desc: string
  icon: React.ElementType
  highlight?: boolean
}

function TimelineSlide({
  tag,
  title,
  accent,
  weeks,
  note,
}: {
  tag: string
  title: React.ReactNode
  accent: string
  weeks: WeekItem[]
  note?: string
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>{tag}</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        {title}
      </motion.h2>

      <div className="relative mt-7">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.3 }}
          className="absolute left-0 right-0 top-7 hidden h-1 origin-left rounded-full bg-gradient-to-r from-[#f5b93b] via-[#35459c] to-[#f5b93b] md:block"
        />
        <div className={`grid gap-3.5 sm:gap-4 ${weeks.length === 4 ? 'sm:grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-5'}`}>
          {weeks.map((w, i) => (
            <motion.div
              key={w.week}
              variants={item}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl border p-4 pt-9 shadow-sm backdrop-blur transition-all ${
                w.highlight
                  ? 'card-glow border-[#f5b93b]/60 bg-gradient-to-b from-[#f5b93b]/25 to-white/95 ring-2 ring-[#f5b93b]/40'
                  : 'border-[#35459c]/10 bg-white/85 hover:border-[#35459c]/25'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 220, damping: 14 }}
                className={`absolute -top-4 left-4 flex h-9 w-9 items-center justify-center rounded-xl font-display text-xs font-extrabold shadow-md ${
                  w.highlight
                    ? 'bg-gradient-to-br from-[#f5b93b] to-[#e9a313] text-[#2c3670]'
                    : 'bg-gradient-to-br from-[#35459c] to-[#4a5dbb] text-white'
                }`}
              >
                {w.week.replace('M', '')}
              </motion.div>
              <div className="mb-1.5 flex items-center gap-1.5 text-[#35459c]">
                <w.icon className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#35459c]/60">Minggu {w.week.replace('M', '')}</span>
              </div>
              <h3 className="font-display text-sm font-bold leading-tight text-[#2c3670]">{w.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#35459c]/75">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {note && (
        <motion.p
          variants={item}
          className={`mt-6 inline-flex items-center gap-2 self-start rounded-full px-5 py-2 text-xs font-bold md:text-sm ${accent}`}
        >
          <Sparkles className="h-4 w-4 text-[#e9a313]" /> {note}
        </motion.p>
      )}
    </motion.div>
  )
}

/* ---------------- Slide 3 : Awal (M1-4) ---------------- */

export function SlideAwal() {
  const weeks: WeekItem[] = [
    { week: 'M1', title: 'Orientasi & n8n', desc: 'Kenalan dengan tim, cara kerja, dan belajar dasar n8n.', icon: Users },
    { week: 'M2', title: 'Perancangan King Ell', desc: 'Dapat penjelasan proyek King Ell, lalu bikin gambaran alurnya.', icon: Workflow },
    { week: 'M3', title: 'Build & Pengujian', desc: 'Bikin workflow di n8n dan coba-coba sampai jalan.', icon: Wrench },
    { week: 'M4', title: 'Koneksi ke Owner', desc: 'Notifikasi otomatisnya sudah bisa terkirim ke owner.', icon: Network, highlight: true },
  ]
  return (
    <TimelineSlide
      tag="Fase 01 · Minggu 1–4"
      title={<>Awal Magang — <span className="text-[#e9a313]">Fondasi &amp; Sistem Pertama</span></>}
      accent="bg-[#35459c]/10 text-[#35459c]"
      weeks={weeks}
      note="Bulan pertama fokus adaptasi dan menyelesaikan sistem pertama sampai bisa dipakai owner."
    />
  )
}

/* ---------------- Slide 4 : Tengah (M5-9) ---------------- */

export function SlideTengah() {
  const weeks: WeekItem[] = [
    { week: 'M5', title: 'Rancang Gunaku AI', desc: 'Bikin alur percakapan chatbot rental.', icon: Bot },
    { week: 'M6', title: 'Integrasi Multi-Service', desc: 'Sambungkan Google Sheets, AI Groq, dan WhatsApp (Evolution API).', icon: Database },
    { week: 'M7', title: 'Fitur Operasional', desc: 'Bikin fitur broadcast, cek pembayaran, pembatalan, dan handle kasus-kasus kecil.', icon: MessageSquare },
    { week: 'M8', title: 'Migrasi ke Supabase', desc: 'Pindah database ke Supabase biar lebih stabil, dan pecah 1 workflow jadi 5 bagian.', icon: ArrowRightLeft, highlight: true },
    { week: 'M9', title: 'Pindah ke Telegram', desc: 'Nomor WA sempat keblokir, jadi pindah ke Telegram.', icon: Rocket },
  ]
  return (
    <TimelineSlide
      tag="Fase 02 · Minggu 5–9"
      title={<>Pertengahan — <span className="text-[#e9a313]">Tantangan &amp; Solusi Kendala</span></>}
      accent="bg-[#f5b93b]/25 text-[#2c3670]"
      weeks={weeks}
      note="Fase ini banyak belajar soal bagi workflow, perbaiki database, dan ganti platform kalau ada kendala."
    />
  )
}

/* ---------------- Slide 5 : Akhir (M10-13) ---------------- */

export function SlideAkhir() {
  const weeks: WeekItem[] = [
    { week: 'M10', title: 'Finalisasi Gunaku AI', desc: 'Tes akhir Gunaku AI di Telegram dan rapikan yang kurang.', icon: Flag, highlight: true },
    { week: 'M11', title: 'Proyek Rumah Keripik', desc: 'Coba bikin chatbot web Rumah Keripik untuk rekomendasi produk.', icon: Bot },
    { week: 'M12', title: 'Navigasi Peta & Rute', desc: 'Sambungkan hitung rute kurir (OSRM) dan peta (MapLibre).', icon: Map },
    { week: 'M13', title: 'Eksplorasi Bot Laundry', desc: 'Mulai bikin rancangan otomasi untuk laundry karpet.', icon: ShoppingBag },
  ]
  return (
    <TimelineSlide
      tag="Fase 03 · Minggu 10–13"
      title={<>Akhir Magang — <span className="text-[#e9a313]">Penyelesaian &amp; Proyek Mandiri</span></>}
      accent="bg-[#35459c]/10 text-[#35459c]"
      weeks={weeks}
      note="Di akhir sudah lebih berani bikin rancangan sendiri tanpa harus selalu diarahkan."
    />
  )
}

/* ---------------- Slide 6 : Galeri ---------------- */

export function SlideGaleri() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>Dokumentasi Kegiatan</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        Galeri <span className="text-[#e9a313]">&amp;</span> Dokumentasi
      </motion.h2>
      <motion.p variants={item} className="mt-2 text-sm text-[#35459c]/75 md:text-base">
        Foto kegiatan, screenshot alur n8n, dan tampilan sistem yang sempat dikerjakan.
      </motion.p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <motion.div variants={item} className="md:col-span-2">
          <MediaSlot
            id="slot-galeri-video"
            kind="video"
            label="Video Demo / Rekaman Produk (Opsional)"
            ratio="16/9"
            className="h-full min-h-[220px]"
          />
        </motion.div>
        <div className="grid gap-4">
          <motion.div variants={item}>
            <MediaSlot id="slot-galeri-tim" kind="image" label="Foto Bersama Tim / Kantor" ratio="16/9" />
          </motion.div>
          <motion.div variants={item}>
            <MediaSlot id="slot-galeri-n8n" kind="image" label="Screenshot Arsitektur n8n" ratio="16/9" />
          </motion.div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <motion.div variants={item}>
          <MediaSlot id="slot-galeri-gunaku" kind="image" label="Tampilan Gunaku AI Telegram" ratio="16/9" />
        </motion.div>
        <motion.div variants={item}>
          <MediaSlot id="slot-galeri-keripik" kind="image" label="Tampilan Rumah Keripik AI" ratio="16/9" />
        </motion.div>
        <motion.div variants={item}>
          <MediaSlot id="slot-galeri-lainnya" kind="image" label="Dokumentasi Lainnya" ratio="16/9" />
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ---------------- Slide 7 : Kesan & Pelajaran ---------------- */

export function SlideKesan() {
  const lessons = [
    { icon: Search, text: 'Terbiasa cari tahu sendiri lewat dokumentasi' },
    { icon: Heart, text: 'Belajar debug pelan-pelan dan teratur' },
    { icon: GraduationCap, text: 'Lebih teliti urusan format data' },
    { icon: BrainCircuit, text: 'Pakai AI untuk bantu belajar' },
  ]
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>Kesan &amp; Pembelajaran</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        Hal yang Saya <span className="text-[#e9a313]">Pelajari</span>
      </motion.h2>

      <div className="mt-7 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <motion.div
          variants={item}
          className="card-glow relative overflow-hidden rounded-3xl border border-[#35459c]/15 bg-white/90 p-6 md:p-8 backdrop-blur"
        >
          <Quote className="absolute -top-3 left-6 h-16 w-16 text-[#f5b93b]/35" />
          <p className="font-display relative text-lg font-bold leading-relaxed text-[#2c3670] md:text-2xl">
            “Di kuliah, tugas selesai setelah dikumpul. Di magang, sistem yang dibuat dipakai terus, jadi harus siap diperbaiki kalau ada kebutuhan baru.”
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#35459c]/80">
            Jadi belajar kalau kode tidak cukup jalan saja, tapi harus rapi dan mudah dipahami tim.
          </p>
        </motion.div>

        <div className="grid gap-3">
          {lessons.map((l) => (
            <motion.div
              key={l.text}
              variants={item}
              whileHover={{ x: 6 }}
              className="flex items-center gap-3.5 rounded-2xl border border-[#35459c]/10 bg-white/80 p-3.5 shadow-sm backdrop-blur"
            >
              <span className="rounded-xl bg-[#f5b93b]/25 p-2.5 text-[#e9a313] shadow-sm">
                <l.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold text-[#2c3670]">{l.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

        <motion.p variants={item} className="mt-6 max-w-3xl text-sm leading-relaxed text-[#35459c]/75">
        Dari magang ini jadi lebih paham teknis, lebih rapi soal alur data, dan lebih tenang kalau ada masalah.
      </motion.p>
    </motion.div>
  )
}

/* ---------------- Slide 8 : Skill yang Didalami ---------------- */

export function SlideSkill() {
  const skills = [
    { icon: Bot, label: 'Perancangan Alur Chatbot' },
    { icon: Workflow, label: 'Workflow Automasi n8n Lanjut' },
    { icon: FileCode2, label: 'Transformasi & Manipulasi JSON' },
    { icon: Route, label: 'Progressive Identification Logic' },
    { icon: Database, label: 'Database Supabase & Query SQL' },
    { icon: BrainCircuit, label: 'Integrasi Model AI (Groq & DeepSeek)' },
    { icon: TestTube2, label: 'End-to-End Testing Sistem' },
    { icon: Webhook, label: 'Webhook & Event-Driven Triggers' },
    { icon: MessageSquare, label: 'Integrasi Telegram Bot API' },
    { icon: Bug, label: 'Analisis Log & Systematic Debugging' },
    { icon: LayoutGrid, label: 'Struktur Workflow Modular' },
    { icon: Split, label: 'Pemisahan Sub-Workflow Terisolasi' },
    { icon: Network, label: 'Smart Routing & Fallback Logic' },
    { icon: Route, label: 'Pembuatan Diagram Alur & Blueprint' },
    { icon: Sparkles, label: 'Benchmarking & Evaluasi Respon AI' },
  ]
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>Kompetensi Teknis</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        Hal yang Saya <span className="text-[#e9a313]">Pelajari &amp; Gunakan</span>
      </motion.h2>
      <motion.p variants={item} className="mt-2 text-sm text-[#35459c]/75 md:text-base">
        Beberapa hal yang sempat dicoba dan dipelajari selama 3 bulan.
      </motion.p>

      <div className="mt-7 flex flex-wrap gap-2.5 md:gap-3">
        {skills.map((s, i) => (
          <motion.div
            key={s.label}
            variants={item}
            whileHover={{ scale: 1.06, y: -3 }}
            className={`flex cursor-default items-center gap-2.5 rounded-2xl border px-3.5 py-2 text-xs font-bold shadow-sm backdrop-blur transition-all md:px-4 md:py-2.5 md:text-sm ${
              i % 4 === 0
                ? 'border-[#f5b93b]/60 bg-[#f5b93b]/25 text-[#2c3670]'
                : 'border-[#35459c]/15 bg-white/85 text-[#35459c] hover:border-[#35459c]/30'
            }`}
          >
            <s.icon className="h-4 w-4" />
            {s.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---------------- Slide 9 : Penutup ---------------- */

export function SlidePenutup() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-6 text-center"
    >
      <motion.div variants={item} className="mb-6 flex items-center gap-5">
        <img src="/assets/logo-afila.png" alt="Logo Afila Media Karya" width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16 rounded-2xl bg-white object-contain p-2 card-glow" />
        <img src="/assets/logo-unm.png" alt="Logo Universitas Negeri Makassar" width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16 rounded-full bg-white object-contain p-1.5 card-glow" />
      </motion.div>

      <motion.h2 variants={item} className="font-display max-w-4xl text-4xl font-extrabold leading-tight text-[#2c3670] sm:text-5xl md:text-7xl">
        Terima <span className="shine">Kasih!</span>
      </motion.h2>

      <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-[#35459c]/80 md:text-lg">
        Terima kasih untuk mentor dan tim Afila yang sudah bimbing selama 3 bulan magang.
      </motion.p>

      <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {['Pengalaman Nyata', 'Pembelajaran Berharga', 'Kerja Tim'].map((w) => (
          <span
            key={w}
            className="rounded-full border border-[#35459c]/20 bg-white/80 px-5 py-2 text-xs font-bold text-[#35459c] shadow-sm backdrop-blur md:text-sm"
          >
            {w}
          </span>
        ))}
      </motion.div>

      <motion.p variants={item} className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-[#35459c]/50">
        Presentasi Magang · Afila × UNM
      </motion.p>
    </motion.div>
  )
}

/* ---------------- Speaker Notes Metadata ---------------- */

export interface SlideData {
  slug: string
  title: string
  component: React.ComponentType
  deco: number
  keyPoints: string[]
  notes: string[]
}

export const slideDeckData: SlideData[] = [
  {
    slug: 'cover',
    title: 'Cover & Pembuka',
    component: SlideCover,
    deco: 0,
    keyPoints: [
      'Sapa audiens dan perkenalkan diri.',
      'Sebutkan magang: Afila Media Karya × Universitas Negeri Makassar.',
      'Garis besar: ringkasan 3 bulan dari awal masuk sampai proyek yang dikerjakan.',
    ],
    notes: [
      'Buka dengan salam dan terima kasih sudah hadir.',
      'Sampaikan presentasi ini ringkasan alur seleksi, kegiatan tiap bulan, dan hal yang dipelajari.',
    ],
  },
  {
    slug: 'seleksi',
    title: 'Awal Masuk & Seleksi',
    component: SlideAlasan,
    deco: 1,
    keyPoints: [
      'Awal mula info magang melalui ajakan teman kampus.',
      'Tes Hari ke-1: Pembuatan prototype web SIAKAP.',
      'Tes Hari ke-2: Pembuatan logika aplikasi Absen Azka.',
    ],
    notes: ['Ceritakan tes 2 hari untuk lihat kesiapan dasar sebelum mulai magang.'],
  },
  {
    slug: 'fase-1',
    title: 'Awal Magang (M1–4)',
    component: SlideAwal,
    deco: 2,
    keyPoints: [
      'M1: Orientasi tim dan pemahaman dasar otomasi n8n.',
      'M2-M3: Desain alur dan pembangunan workflow sistem King Ell.',
      'M4: Sistem pertama berhasil terhubung ke akun owner.',
    ],
    notes: ['Ceritakan belajar n8n dari awal dan waktu sistem pertama King Ell bisa kirim notifikasi ke owner.'],
  },
  {
    slug: 'fase-2',
    title: 'Pertengahan (M5–9)',
    component: SlideTengah,
    deco: 0,
    keyPoints: [
      'M5-M7: Pengembangan Gunaku AI (chatbot rental) dengan Groq & Evolution API.',
      'M8: Migrasi database ke Supabase dan pemecahan workflow menjadi 5 modul.',
      'M9: Mengatasi nomor WhatsApp yang terblokir dengan memindahkan bot ke Telegram.',
    ],
    notes: ['Ceritakan waktu nomor WA keblokir dan akhirnya pindah ke Telegram biar tetap jalan.'],
  },
  {
    slug: 'fase-3',
    title: 'Akhir Magang (M10–13)',
    component: SlideAkhir,
    deco: 1,
    keyPoints: [
      'M10: Finalisasi dan testing menyeluruh bot Gunaku AI di Telegram.',
      'M11-M12: Inisiatif proyek Rumah Keripik (rekomendasi produk + rute OSRM & MapLibre).',
      'M13: Eksplorasi rancangan automasi baru untuk operasional laundry karpet.',
    ],
    notes: ['Ceritakan di akhir sudah lebih berani bikin rancangan sendiri.'],
  },
  {
    slug: 'galeri',
    title: 'Dokumentasi',
    component: SlideGaleri,
    deco: 2,
    keyPoints: [
      'Menampilkan dokumentasi visual: suasana kerja, screenshot node n8n, dan antarmuka bot.',
    ],
    notes: ['Tunjukin foto dan screenshot sistem yang sempat dikerjakan.'],
  },
  {
    slug: 'kesan',
    title: 'Kesan & Pembelajaran',
    component: SlideKesan,
    deco: 0,
    keyPoints: [
      'Di kuliah tugas selesai setelah dikumpul, di magang sistem dipakai terus.',
      'Jadi lebih terbiasa cari tahu sendiri dan lebih teliti soal data.',
    ],
    notes: ['Sampaikan hal yang paling kerasa beda antara tugas kuliah dan kerja di industri.'],
  },
  {
    slug: 'skill',
    title: 'Hal yang Dipelajari',
    component: SlideSkill,
    deco: 1,
    keyPoints: [
      'n8n, webhook, dan olah JSON.',
      'Supabase/SQL dan coba pakai AI (Groq/DeepSeek).',
      'Cek log, bagi workflow jadi bagian kecil, dan handle error.',
    ],
    notes: ['Sebutkan hal yang sempat dicoba selama magang.'],
  },
  {
    slug: 'penutup',
    title: 'Terima Kasih',
    component: SlidePenutup,
    deco: 2,
    keyPoints: [
      'Menyampaikan apresiasi tulus kepada mentor dan seluruh tim Afila.',
      'Membuka sesi tanya jawab (Q&A).',
    ],
    notes: [
      'Tutup presentasi dengan santun dan persilakan mentor atau audiens memberikan tanggapan atau pertanyaan.',
    ],
  },
]
