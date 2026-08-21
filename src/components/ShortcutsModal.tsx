import { motion } from 'framer-motion'
import { X, Keyboard } from 'lucide-react'

interface ShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts = [
  { key: '→ / Space / PgDn', desc: 'Lanjut ke slide berikutnya' },
  { key: '← / PgUp', desc: 'Kembali ke slide sebelumnya' },
  { key: 'Home / End', desc: 'Ke slide pertama / terakhir' },
  { key: 'O', desc: 'Buka / tutup ikhtisar semua slide (Overview)' },
  { key: 'N', desc: 'Buka / tutup Speaker Notes & Timer' },
  { key: 'P', desc: 'Mulai / jeda otomatis (Auto-play slideshow)' },
  { key: 'M', desc: 'Nyalakan / matikan efek suara (Mute SFX)' },
  { key: 'F', desc: 'Masuk / keluar layar penuh (Fullscreen)' },
  { key: 'C', desc: 'Salin tautan langsung ke slide ini' },
  { key: '? / H', desc: 'Buka panduan tombol pintas keyboard' },
  { key: 'Esc', desc: 'Tutup modal yang terbuka' },
]

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pintasan keyboard"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-3xl border border-[#35459c]/20 bg-[#fffdf4] shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#35459c]/10 bg-white/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#35459c] text-white">
              <Keyboard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#2c3670]">Pintasan Keyboard</h3>
              <p className="text-xs text-[#35459c]/60">Navigasi cepat untuk presentasi lebih lancar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#35459c]/60 transition hover:bg-black/5 hover:text-[#35459c]"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List of shortcuts */}
        <div className="max-h-[60vh] space-y-2 overflow-y-auto p-6">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#35459c]/10 bg-white/80 p-3"
            >
              <span className="text-sm font-medium text-[#2c3670]">{s.desc}</span>
              <kbd className="shrink-0 rounded-lg border border-[#35459c]/20 bg-[#35459c]/5 px-2.5 py-1 font-mono text-xs font-bold text-[#35459c]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="border-t border-[#35459c]/10 bg-white/60 px-6 py-3 text-center text-xs text-[#35459c]/60">
          Tekan <kbd className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[11px]">Esc</kbd> untuk menutup
        </div>
      </motion.div>
    </div>
  )
}
