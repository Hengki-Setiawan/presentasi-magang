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
          alt="Logo Afila"
          className="h-16 w-16 rounded-3xl bg-white object-contain p-2 card-glow md:h-24 md:w-24"
          whileHover={{ scale: 1.08, rotate: -3 }}
        />
        <motion.div variants={item} className="h-10 w-px bg-[#35459c]/20 md:h-12" />
        <motion.img
          src="/assets/logo-unm.png"
          alt="Logo UNM"
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

      <motion.p variants={item} className="mt-5 max-w-xl text-base text-[#35459c]/80 md:mt-6 md:text-xl">
        13 minggu belajar, membangun, dan bertumbuh — dari nol sampai produk yang benar-benar hidup.
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
      title: 'Diajak Teman',
      desc: 'Semua berawal dari ajakan seorang teman — pintu masuk sederhana yang membuka kesempatan emas belajar di industri nyata.',
    },
    {
      icon: FileCode2,
      title: 'Tes Hari ke-1: SIAKAP',
      desc: 'Diberi tantangan membangun prototype aplikasi statis tentang SIAKAP untuk menguji kecepatan dan dasar pemahaman web.',
    },
    {
      icon: ClipboardCheck,
      title: 'Tes Hari ke-2: Absen Azka',
      desc: 'Melanjutkan ke tantangan berikutnya: membuat alur dan aplikasi absen Azka dengan logika fungsional.',
    },
  ]
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>Prolog &amp; Seleksi</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        Bagaimana Saya Bisa <span className="text-[#e9a313]">Masuk?</span>
      </motion.h2>
      <motion.p variants={item} className="mt-3 max-w-2xl text-base text-[#35459c]/75 md:text-lg">
        Sebelum resmi magang, saya melalui proses tes intensif selama <b className="text-[#2c3670]">2 hari</b> untuk membuktikan kesiapan teknis.
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

      <motion.div variants={item} className="mt-6 grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="flex items-center gap-4 rounded-3xl border border-[#f5b93b]/40 bg-[#f5b93b]/15 p-5">
          <span className="shrink-0 rounded-2xl bg-white/90 p-3 shadow-sm">
            <Rocket className="h-7 w-7 text-[#e9a313]" />
          </span>
          <p className="text-sm font-semibold leading-relaxed text-[#2c3670]">
            Dua tantangan selesai dalam 2 hari — dari sinilah kepercayaan terbentuk dan petualangan magang 13 minggu resmi dimulai.
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
    { week: 'M1', title: 'Perkenalan & n8n', desc: 'Orientasi kerja, pengenalan ritme tim, dan eksplorasi automasi n8n dari dasar.', icon: Users },
    { week: 'M2', title: 'Rancang Alur King Ell', desc: 'Briefing tugas King Ell — mendesain blueprint dan arsitektur alur sistem.', icon: Workflow },
    { week: 'M3', title: 'Build & Iterasi', desc: 'Membangun logika workflow King Ell dan melakukan pengujian berkelanjutan.', icon: Wrench },
    { week: 'M4', title: 'Koneksi ke Owner', desc: 'Menghubungkan webhook dan notifikasi sistem King Ell langsung dengan owner bisnis.', icon: Network, highlight: true },
  ]
  return (
    <TimelineSlide
      tag="Fase 01 · Minggu 1–4"
      title={<>Awal Magang — <span className="text-[#e9a313]">Fondasi &amp; Sistem Pertama</span></>}
      accent="bg-[#35459c]/10 text-[#35459c]"
      weeks={weeks}
      note="Bulan pertama: dari pemahaman dasar n8n hingga berhasil menghubungkan sistem pertama ke owner."
    />
  )
}

/* ---------------- Slide 4 : Tengah (M5-9) ---------------- */

export function SlideTengah() {
  const weeks: WeekItem[] = [
    { week: 'M5', title: 'Masuk Gunaku AI', desc: 'Chatbot rental — merancang diagram flow interaktif & logic branching.', icon: Bot },
    { week: 'M6', title: 'Build & Fitur', desc: 'Integrasi Google Sheets, model AI Groq untuk pengujian, dan Evolution API.', icon: Database },
    { week: 'M7', title: 'Fitur Lanjutan', desc: 'Broadcast multi-user & merchant, payment gateway, flow pembatalan, & edge cases.', icon: MessageSquare },
    { week: 'M8', title: 'Migrasi Supabase', desc: 'Pindah ke Supabase (hindari rate limit), integrasi DeepSeek, split workflow jadi 5.', icon: ArrowRightLeft, highlight: true },
    { week: 'M9', title: 'Migrasi ke Telegram', desc: 'Evolution API rentan ban (2 nomor terblokir), migrasi arsitektur ke Telegram Bot.', icon: Rocket },
  ]
  return (
    <TimelineSlide
      tag="Fase 02 · Minggu 5–9"
      title={<>Pertengahan — <span className="text-[#e9a313]">Tantangan &amp; Solusi Nyata</span></>}
      accent="bg-[#f5b93b]/25 text-[#2c3670]"
      weeks={weeks}
      note="Fase paling dinamis: menghadapi nomor terblokir, migrasi database, dan memecah 1 workflow besar jadi 5 sub-flow tangguh."
    />
  )
}

/* ---------------- Slide 5 : Akhir (M10-13) ---------------- */

export function SlideAkhir() {
  const weeks: WeekItem[] = [
    { week: 'M10', title: 'Finalisasi Gunaku', desc: 'Rilis 100% siap pakai, stress testing, KPI dashboard card, & broadcast merchant di Telegram.', icon: Flag, highlight: true },
    { week: 'M11', title: 'Rumah Keripik · Bot', desc: 'Inisiatif mandiri: Progressive identification chatbot web dengan UI ala modern AI workspace.', icon: Bot },
    { week: 'M12', title: 'Navigasi Geografis', desc: 'Integrasi routing OSRM & MapLibre map interaktif dengan infrastruktur backend.', icon: Map },
    { week: 'M13', title: 'Bot UMKM Baru', desc: 'Memulai arsitektur bot baru: otomatisasi operasional laundry karpet.', icon: ShoppingBag },
  ]
  return (
    <TimelineSlide
      tag="Fase 03 · Minggu 10–13"
      title={<>Akhir Magang — <span className="text-[#e9a313]">Pencapaian &amp; Inisiatif Mandiri</span></>}
      accent="bg-[#35459c]/10 text-[#35459c]"
      weeks={weeks}
      note="Dari menuntaskan produk tim hingga memiliki kepercayaan diri membangun proyek mandiri."
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
        Galeri <span className="text-[#e9a313]">&amp;</span> Momen Magang
      </motion.h2>
      <motion.p variants={item} className="mt-2 text-sm text-[#35459c]/75 md:text-base">
        Unggah foto &amp; video dokumentasi Anda — media akan tersimpan secara permanen di browser ini.
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
          <MediaSlot id="slot-galeri-lainnya" kind="image" label="Momen Berkesan Lainnya" ratio="16/9" />
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ---------------- Slide 7 : Kesan & Pelajaran ---------------- */

export function SlideKesan() {
  const lessons = [
    { icon: Search, text: 'Riset Mandiri yang Kuat' },
    { icon: Heart, text: 'Ketahanan Menghadapi Masalah (Debugging)' },
    { icon: GraduationCap, text: 'Presisi & Ketelitian Alur Data' },
    { icon: BrainCircuit, text: 'Memanfaatkan AI sebagai Pengungkit Belajar' },
  ]
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-12"
    >
      <SectionTag>Refleksi Pengalaman</SectionTag>
      <motion.h2 variants={item} className="font-display mt-4 text-3xl font-extrabold text-[#2c3670] sm:text-4xl md:text-5xl">
        Kesan <span className="text-[#e9a313]">&amp;</span> Pelajaran Berharga
      </motion.h2>

      <div className="mt-7 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <motion.div
          variants={item}
          className="card-glow relative overflow-hidden rounded-3xl border border-[#35459c]/15 bg-white/90 p-6 md:p-8 backdrop-blur"
        >
          <Quote className="absolute -top-3 left-6 h-16 w-16 text-[#f5b93b]/35" />
          <p className="font-display relative text-lg font-bold leading-relaxed text-[#2c3670] md:text-2xl">
            “Development yang sesungguhnya tidak pernah berhenti di kata 'selesai' — produk harus terus dirawat,
            di-improve, dan disesuaikan agar tetap hidup bagi penggunanya.”
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#35459c]/80">
            Ini pola pikir industri yang sangat berbeda dengan di kampus. Di perkuliahan, tugas dinilai lalu selesai.
            Di industri nyata, <b>sistem hidup berdampingan dengan kebutuhan pengguna nyata.</b>
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
        Pengalaman yang sangat berharga — mematangkan pemahaman teknis sekaligus mentalitas *problem solver*.
      </motion.p>
    </motion.div>
  )
}

/* ---------------- Slide 8 : Skill yang Didalami ---------------- */

export function SlideSkill() {
  const skills = [
    { icon: Bot, label: 'Chatbot Architecture' },
    { icon: Workflow, label: 'n8n Advanced Workflow' },
    { icon: FileCode2, label: 'JSON Data Transformation' },
    { icon: Route, label: 'Progressive Identification' },
    { icon: Database, label: 'Supabase & SQL Integration' },
    { icon: BrainCircuit, label: 'Implementasi AI (Groq & DeepSeek)' },
    { icon: TestTube2, label: 'Manual End-to-End Testing' },
    { icon: Webhook, label: 'Webhook & Event Trigger' },
    { icon: MessageSquare, label: 'Telegram Bot API & WA Automation' },
    { icon: Bug, label: 'Log Analysis & Debugging' },
    { icon: LayoutGrid, label: 'Modular Node Management' },
    { icon: Split, label: 'Workflow Splitting (Gunaku → 5 WF)' },
    { icon: Network, label: 'Smart Router & Fallback Logic' },
    { icon: Route, label: 'Flowchart & Sequence Design' },
    { icon: Sparkles, label: 'Benchmarking Model AI' },
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
        Yang Saya <span className="text-[#e9a313]">Dalami</span>
      </motion.h2>
      <motion.p variants={item} className="mt-2 text-sm text-[#35459c]/75 md:text-base">
        Keahlian praktis yang dikuasai selama 13 minggu pengembangan sistem automasi dan AI.
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
        <img src="/assets/logo-afila.png" alt="Logo Afila" className="h-16 w-16 rounded-2xl bg-white object-contain p-2 card-glow" />
        <img src="/assets/logo-unm.png" alt="Logo UNM" className="h-16 w-16 rounded-full bg-white object-contain p-1.5 card-glow" />
      </motion.div>

      <motion.h2 variants={item} className="font-display max-w-4xl text-4xl font-extrabold leading-tight text-[#2c3670] sm:text-5xl md:text-7xl">
        Terima <span className="shine">Kasih!</span>
      </motion.h2>

      <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-[#35459c]/80 md:text-lg">
        Kepada seluruh mentor, kakak-kakak pembimbing, dan rekan-rekan magang di Afila Media Karya atas kesempatan, ilmu, dan bimbingan yang luar biasa.
      </motion.p>

      <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {['Pengalaman Nyata', 'Pembelajaran Berkelanjutan', 'Kolaborasi Hebat'].map((w) => (
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
      'Sebutkan program magang: Afila × Universitas Negeri Makassar.',
      'Jelaskan tema besar: Perjalanan 13 minggu dari nol hingga produk rilis.',
    ],
    notes: [
      'Ucapkan salam dan terima kasih kepada mentor dan tim Afila.',
      'Sampaikan bahwa presentasi ini merangkum milestone mingguan, tantangan nyata di lapangan, serta kompetensi yang berhasil dibangun.',
    ],
  },
  {
    slug: 'seleksi',
    title: 'Bagaimana Bisa Masuk',
    component: SlideAlasan,
    deco: 1,
    keyPoints: [
      'Awal mula bergabung melalui ajakan teman.',
      'Tes Hari ke-1: Pembuatan prototype SIAKAP.',
      'Tes Hari ke-2: Pembuatan alur & aplikasi Absen Azka.',
    ],
    notes: [
      'Tekankan kecepatan eksekusi 2 hari tes sebagai bukti komitmen dan kesiapan teknis sebelum resmi onboard.',
    ],
  },
  {
    slug: 'fase-1',
    title: 'Awal Magang (M1–4)',
    component: SlideAwal,
    deco: 2,
    keyPoints: [
      'M1: Pengenalan dasar automasi n8n & webhook.',
      'M2-M3: Desain alur & pembangunan sistem King Ell.',
      'M4: Sistem pertama berhasil terhubung ke owner.',
    ],
    notes: [
      'Ceritakan transisi dari teori ke praktik saat membangun King Ell.',
      'Highlight momen M4 saat hasil automasi pertama kali dirasakan langsung oleh owner bisnis.',
    ],
  },
  {
    slug: 'fase-2',
    title: 'Pertengahan (M5–9)',
    component: SlideTengah,
    deco: 0,
    keyPoints: [
      'M5-M7: Pengembangan Gunaku AI rental chatbot dengan Groq & Evolution API.',
      'M8: Migrasi ke Supabase & pemecahan 1 workflow jadi 5 sub-workflow.',
      'M9: Mengatasi nomor WhatsApp terblokir dengan migrasi arsitektur ke Telegram Bot.',
    ],
    notes: [
      'Ini adalah fase tersulit dengan pelajaran teknis paling banyak.',
      'Jelaskan bagaimana pemecahan modul (splitting workflow) membuat sistem lebih terisolasi dan mudah di-debug.',
    ],
  },
  {
    slug: 'fase-3',
    title: 'Akhir Magang (M10–13)',
    component: SlideAkhir,
    deco: 1,
    keyPoints: [
      'M10: Finalisasi 100% Gunaku AI, testing berulang & broadcast Telegram.',
      'M11-M12: Proyek mandiri Rumah Keripik (AI identification + rute OSRM & MapLibre).',
      'M13: Memulai sistem otomasi baru untuk laundry karpet.',
    ],
    notes: [
      'Tekankan pertumbuhan rasa percaya diri dari mengerjakan tugas tim hingga mampu menginisiasi proyek sendiri.',
    ],
  },
  {
    slug: 'galeri',
    title: 'Galeri & Dokumentasi',
    component: SlideGaleri,
    deco: 2,
    keyPoints: [
      'Tampilkan cuplikan foto kerja, video demo, dan momen berkesan bersama tim.',
      'Media yang diunggah tersimpan secara otomatis dan dapat dizoom.',
    ],
    notes: [
      'Ajak audiens melihat bukti visual dan demo hasil karya yang telah dikerjakan.',
    ],
  },
  {
    slug: 'kesan',
    title: 'Kesan & Pelajaran',
    component: SlideKesan,
    deco: 0,
    keyPoints: [
      'Filosofi industri: Development tidak pernah benar-benar selesai.',
      'Peningkatan kemampuan riset, ketelitian, kesabaran, dan pemanfaatan AI.',
    ],
    notes: [
      'Bandingkan pola pikir tugas kuliah (selesai dikumpul) vs industri (iterasi dan pemeliharaan berkelanjutan).',
    ],
  },
  {
    slug: 'skill',
    title: 'Yang Saya Dalami',
    component: SlideSkill,
    deco: 1,
    keyPoints: [
      'Penyusunan logic n8n, webhook, dan data transformation (JSON).',
      'Integrasi database Supabase dan integrasi multi-model AI.',
      'Manajemen error, split node, dan debugging melalui system log.',
    ],
    notes: [
      'Sebutkan bahwa skill ini menjadi modal berharga untuk karier profesional ke depan.',
    ],
  },
  {
    slug: 'penutup',
    title: 'Terima Kasih',
    component: SlidePenutup,
    deco: 2,
    keyPoints: [
      'Ungkapkan apresiasi tulus kepada mentor dan rekan magang.',
      'Buka sesi tanya jawab (Q&A).',
    ],
    notes: [
      'Tutup presentasi dengan ramah dan penuh percaya diri.',
    ],
  },
]
