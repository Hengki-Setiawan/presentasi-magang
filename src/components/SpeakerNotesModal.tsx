import { motion } from 'framer-motion'
import { X, Clock, MessageSquareQuote, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react'

interface SpeakerNotesModalProps {
  isOpen: boolean
  onClose: () => void
  currentSlideIndex: number
  totalSlides: number
  slideTitle: string
  notes?: string[]
  keyPoints?: string[]
  timerSeconds: number
  isTimerRunning: boolean
  onToggleTimer: () => void
  onResetTimer: () => void
}

export function SpeakerNotesModal({
  isOpen,
  onClose,
  currentSlideIndex,
  totalSlides,
  slideTitle,
  notes = [],
  keyPoints = [],
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
}: SpeakerNotesModalProps) {
  if (!isOpen) return null

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const remSecs = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Speaker notes: ${slideTitle}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-[#35459c]/20 bg-[#fffdf4] shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#35459c]/10 bg-white/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#35459c] text-white">
              <MessageSquareQuote className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#2c3670]">Speaker Notes &amp; Timer</h3>
              <p className="text-xs text-[#35459c]/60">
                Slide {currentSlideIndex + 1} of {totalSlides}: {slideTitle}
              </p>
            </div>
          </div>

          {/* Stopwatch controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-[#35459c]/10 px-3 py-1 font-mono text-sm font-bold text-[#35459c]">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
            <button
              onClick={onToggleTimer}
              className="rounded-full bg-[#35459c] p-1.5 text-white transition hover:bg-[#2c3670]"
              title={isTimerRunning ? 'Pause timer' : 'Start timer'}
              aria-label={isTimerRunning ? 'Pause timer' : 'Start timer'}
            >
              {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={onResetTimer}
              className="rounded-full border border-[#35459c]/20 p-1.5 text-[#35459c] transition hover:bg-black/5"
              title="Reset timer"
              aria-label="Reset timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="ml-2 rounded-full p-1.5 text-[#35459c]/60 transition hover:bg-black/5 hover:text-[#35459c]"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="max-h-[60vh] space-y-5 overflow-y-auto p-6">
          {/* Key Talking Points */}
          <div>
            <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35459c]/70">
              <CheckCircle2 className="h-4 w-4 text-[#e9a313]" /> Poin Utama Pembicaraan
            </h4>
            <div className="space-y-2">
              {keyPoints.length > 0 ? (
                keyPoints.map((kp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-[#35459c]/10 bg-white/90 p-3.5 shadow-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f5b93b]/30 text-xs font-bold text-[#2c3670]">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-[#2c3670]">{kp}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm italic text-[#35459c]/60">Tidak ada poin khusus untuk slide ini.</p>
              )}
            </div>
          </div>

          {/* Elaborated Notes */}
          {notes.length > 0 && (
            <div>
              <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#35459c]/70">
                Catatan Penjelasan Detail
              </h4>
              <div className="rounded-2xl border border-[#f5b93b]/30 bg-[#f5b93b]/10 p-4 text-sm leading-relaxed text-[#2c3670]">
                {notes.map((n, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    • {n}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="border-t border-[#35459c]/10 bg-white/60 px-6 py-3 text-center text-xs text-[#35459c]/60">
          Tekan <kbd className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[11px]">N</kbd> atau <kbd className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[11px]">Esc</kbd> untuk menutup
        </div>
      </motion.div>
    </div>
  )
}
