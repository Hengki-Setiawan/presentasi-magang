import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Maximize,
  Minimize,
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MessageSquareQuote,
  Keyboard,
  Share2,
  Clock,
  Check,
} from 'lucide-react'
import { Decorations, slideDeckData } from '@/slides'
import { SpeakerNotesModal } from '@/components/SpeakerNotesModal'
import { ShortcutsModal } from '@/components/ShortcutsModal'
import { soundFX } from '@/lib/soundFx'

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 100,
    scale: 0.97,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -100,
    scale: 0.97,
    filter: 'blur(6px)',
  }),
}

export default function App() {
  // Parse initial index from URL hash (e.g. #1 or #fase-2)
  const getInitialIndex = (): number => {
    if (typeof window === 'undefined') return 0
    const hash = window.location.hash.replace('#', '').trim()
    if (!hash) return 0
    const num = parseInt(hash, 10)
    if (!isNaN(num) && num >= 1 && num <= slideDeckData.length) {
      return num - 1
    }
    const found = slideDeckData.findIndex((s) => s.slug === hash)
    return found !== -1 ? found : 0
  }

  const [[index, direction], setIndex] = useState<[number, number]>([getInitialIndex(), 0])
  const [overview, setOverview] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted())
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Presentation Timer
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Auto-play feature
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [autoPlayProgress, setAutoPlayProgress] = useState(0)
  const autoPlayDuration = 8000 // 8 seconds per slide

  // Touch Swipe tracking
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Sync index to URL hash
  const updateHash = useCallback((newIndex: number) => {
    const slug = slideDeckData[newIndex]?.slug || `${newIndex + 1}`
    if (window.location.hash !== `#${slug}`) {
      window.history.replaceState(null, '', `#${slug}`)
    }
  }, [])

  const go = useCallback(
    (dir: number) => {
      setIndex(([i]) => {
        const next = Math.min(Math.max(i + dir, 0), slideDeckData.length - 1)
        if (next !== i) {
          soundFX.playSlideChange(dir)
          updateHash(next)
          setAutoPlayProgress(0)
          return [next, dir]
        }
        return [i, 0]
      })
    },
    [updateHash],
  )

  const jump = useCallback(
    (i: number) => {
      setIndex(([cur]) => {
        if (i !== cur) {
          soundFX.playSlideChange(i > cur ? 1 : -1)
          updateHash(i)
          setAutoPlayProgress(0)
          return [i, i > cur ? 1 : -1]
        }
        return [cur, 0]
      })
      setOverview(false)
    },
    [updateHash],
  )

  // Listen to browser back/forward buttons
  useEffect(() => {
    const onHashChange = () => {
      const targetIdx = getInitialIndex()
      setIndex(([cur]) => {
        if (cur !== targetIdx) {
          return [targetIdx, targetIdx > cur ? 1 : -1]
        }
        return [cur, 0]
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Presentation timer tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let progressInterval: ReturnType<typeof setInterval>

    if (isAutoPlay && !overview && !showNotes && !showShortcuts) {
      const stepMs = 100
      progressInterval = setInterval(() => {
        setAutoPlayProgress((p) => Math.min(p + (stepMs / autoPlayDuration) * 100, 100))
      }, stepMs)

      timer = setTimeout(() => {
        setIndex(([cur]) => {
          const next = (cur + 1) % slideDeckData.length
          soundFX.playSlideChange(1)
          updateHash(next)
          setAutoPlayProgress(0)
          return [next, 1]
        })
      }, autoPlayDuration)
    } else {
      setAutoPlayProgress(0)
    }

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [isAutoPlay, index, overview, showNotes, showShortcuts, updateHash])

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        if (overview) setOverview(false)
        else if (showNotes) setShowNotes(false)
        else if (showShortcuts) setShowShortcuts(false)
        else go(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        if (overview) setOverview(false)
        else if (showNotes) setShowNotes(false)
        else if (showShortcuts) setShowShortcuts(false)
        else go(-1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        jump(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        jump(slideDeckData.length - 1)
      } else if (e.key.toLowerCase() === 'o') {
        e.preventDefault()
        setOverview((o) => !o)
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault()
        setShowNotes((n) => !n)
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setIsAutoPlay((p) => !p)
        soundFX.playTick()
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault()
        const muted = soundFX.toggleMute()
        setIsMuted(muted)
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === '?' || e.key.toLowerCase() === 'h') {
        e.preventDefault()
        setShowShortcuts((s) => !s)
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault()
        handleCopyLink()
      } else if (e.key === 'Escape') {
        setOverview(false)
        setShowNotes(false)
        setShowShortcuts(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, jump, overview, showNotes, showShortcuts])

  const toggleFullscreen = () => {
    soundFX.playTick()
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }

  const toggleMute = () => {
    const muted = soundFX.toggleMute()
    setIsMuted(muted)
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${slideDeckData[index]?.slug || index + 1}`
    navigator.clipboard.writeText(url)
    soundFX.playPop()
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50 // px
    if (diff > threshold) {
      go(1) // Swipe left -> Next
    } else if (diff < -threshold) {
      go(-1) // Swipe right -> Prev
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60)
    const rem = s % 60
    return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
  }

  const currentSlide = slideDeckData[index]
  const Current = currentSlide.component

  return (
    <div
      className="bg-cream noise relative h-full w-full select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top progress bar */}
      <div className="absolute left-0 right-0 top-0 z-40 h-1.5 bg-[#35459c]/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#f5b93b] via-[#e9a313] to-[#35459c]"
          animate={{ width: `${((index + 1) / slideDeckData.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        />
      </div>

      {/* Top Header bar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[#35459c]/10 bg-[#fffdf4]/90 px-4 py-3 shadow-xs backdrop-blur-md sm:px-6 sm:py-3.5">
        {/* Brand & Logo */}
        <div
          className="flex cursor-pointer items-center gap-2.5 transition-transform hover:scale-105 sm:gap-3"
          onClick={() => jump(0)}
          title="Ke Cover Slide"
        >
          <img
            src="/assets/logo-afila.png"
            alt="Afila"
            className="h-8 w-8 rounded-xl bg-white/90 object-contain p-1 shadow-sm sm:h-9 sm:w-9"
          />
          <div className="leading-tight">
            <p className="font-display text-xs font-extrabold text-[#2c3670] sm:text-sm">Magang Journey</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#35459c]/60 sm:text-[10px]">
              Afila × UNM
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Live Timer Pill */}
          <button
            onClick={() => setIsTimerRunning((r) => !r)}
            className={`hidden items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold transition md:flex ${
              isTimerRunning
                ? 'bg-[#f5b93b]/30 text-[#2c3670] ring-1 ring-[#f5b93b]'
                : 'bg-white/70 text-[#35459c]/70 hover:bg-white'
            }`}
            title="Klik untuk Start/Pause Timer"
          >
            <Clock className={`h-3.5 w-3.5 ${isTimerRunning ? 'animate-pulse text-[#e9a313]' : ''}`} />
            <span>{formatTimer(timerSeconds)}</span>
          </button>

          {/* Slide Indicator Badge */}
          <span className="font-display rounded-full bg-[#35459c] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {String(index + 1).padStart(2, '0')} / {String(slideDeckData.length).padStart(2, '0')}
          </span>

          {/* Auto-play Button */}
          <button
            onClick={() => {
              setIsAutoPlay((p) => !p)
              soundFX.playTick()
            }}
            className={`relative overflow-hidden rounded-full border p-2 text-[#35459c] backdrop-blur transition ${
              isAutoPlay
                ? 'border-[#f5b93b] bg-[#f5b93b]/20 text-[#2c3670]'
                : 'border-[#35459c]/20 bg-white/75 hover:bg-[#f5b93b]/30'
            }`}
            aria-label="Otomatis (P)"
            title={isAutoPlay ? 'Jeda otomatis (P)' : 'Mulai tayang otomatis (P)'}
          >
            {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isAutoPlay && (
              <div
                className="absolute bottom-0 left-0 top-0 bg-[#f5b93b]/40 transition-all duration-100"
                style={{ width: `${autoPlayProgress}%` }}
              />
            )}
          </button>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => {
              setShowNotes(true)
              soundFX.playTick()
            }}
            className="rounded-full border border-[#35459c]/20 bg-white/75 p-2 text-[#35459c] backdrop-blur transition hover:bg-[#f5b93b]/30"
            aria-label="Catatan Pembicara (N)"
            title="Catatan Pembicara (N)"
          >
            <MessageSquareQuote className="h-4 w-4" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleMute}
            className={`rounded-full border p-2 backdrop-blur transition ${
              isMuted
                ? 'border-[#35459c]/20 bg-white/75 text-[#35459c]/50'
                : 'border-[#35459c]/20 bg-white/75 text-[#35459c] hover:bg-[#f5b93b]/30'
            }`}
            aria-label={isMuted ? 'Nyalakan Efek Suara (M)' : 'Matikan Efek Suara (M)'}
            title={isMuted ? 'Nyalakan Efek Suara (M)' : 'Matikan Efek Suara (M)'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Copy Slide Link */}
          <button
            onClick={handleCopyLink}
            className="hidden rounded-full border border-[#35459c]/20 bg-white/75 p-2 text-[#35459c] backdrop-blur transition hover:bg-[#f5b93b]/30 sm:flex"
            aria-label="Salin tautan slide ini"
            title="Salin tautan slide ini (C)"
          >
            {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
          </button>

          {/* Overview Grid Toggle */}
          <button
            onClick={() => {
              setOverview(true)
              soundFX.playTick()
            }}
            className="rounded-full border border-[#35459c]/20 bg-white/75 p-2 text-[#35459c] backdrop-blur transition hover:bg-[#f5b93b]/30"
            aria-label="Semua slide (O)"
            title="Semua slide (O)"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => {
              setShowShortcuts(true)
              soundFX.playTick()
            }}
            className="hidden rounded-full border border-[#35459c]/20 bg-white/75 p-2 text-[#35459c] backdrop-blur transition hover:bg-[#f5b93b]/30 sm:flex"
            aria-label="Panduan Tombol Pintas (?)"
            title="Panduan Tombol Pintas (?)"
          >
            <Keyboard className="h-4 w-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="rounded-full border border-[#35459c]/20 bg-white/75 p-2 text-[#35459c] backdrop-blur transition hover:bg-[#f5b93b]/30"
            aria-label="Layar penuh (F)"
            title="Layar penuh (F)"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Area */}
      <main className="fixed inset-0 flex flex-col overflow-x-hidden overflow-y-auto pb-16 pt-16 sm:pb-16 sm:pt-20">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="relative my-auto flex min-h-full w-full flex-col items-center justify-center py-4"
          >
            <Decorations variant={currentSlide.deco} />
            <Current />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          go(-1)
        }}
        disabled={index === 0}
        className="fixed left-3 top-1/2 z-40 -translate-y-1/2 rounded-full border border-[#35459c]/20 bg-white/90 p-2.5 text-[#35459c] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-[#f5b93b]/40 disabled:pointer-events-none disabled:opacity-0 sm:left-5 sm:p-3.5"
        aria-label="Slide sebelumnya"
        title="Slide sebelumnya (←)"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          go(1)
        }}
        disabled={index === slideDeckData.length - 1}
        className="fixed right-3 top-1/2 z-40 -translate-y-1/2 rounded-full border border-[#35459c]/20 bg-white/90 p-2.5 text-[#35459c] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-[#f5b93b]/40 disabled:pointer-events-none disabled:opacity-0 sm:right-5 sm:p-3.5"
        aria-label="Slide berikutnya"
        title="Slide berikutnya (→)"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Bottom slide dots navigation */}
      <div className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#35459c]/15 bg-white/85 px-3 py-1.5 shadow-sm backdrop-blur sm:bottom-4 sm:gap-2">
        {slideDeckData.map((s, i) => (
          <button
            key={s.slug}
            onClick={(e) => {
              e.stopPropagation()
              jump(i)
            }}
            aria-label={s.title}
            title={`${i + 1}. ${s.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-7 bg-[#35459c] shadow-sm sm:w-8'
                : 'w-2 bg-[#35459c]/25 hover:bg-[#f5b93b] hover:w-3'
            }`}
          />
        ))}
      </div>

      {/* Overview Modal */}
      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 overflow-y-auto bg-[#fffdf4]/95 p-6 backdrop-blur-xl sm:p-10"
            onClick={() => setOverview(false)}
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-between border-b border-[#35459c]/10 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#2c3670] sm:text-3xl">
                    Semua Slide Presentasi
                  </h2>
                  <p className="text-xs text-[#35459c]/70 sm:text-sm">
                    Pilih slide untuk melompat langsung atau tekan <kbd className="rounded bg-black/5 px-1 font-mono text-xs">Esc</kbd> untuk kembali
                  </p>
                </div>
                <button
                  onClick={() => setOverview(false)}
                  className="rounded-full bg-[#35459c] p-2 text-white shadow hover:bg-[#2c3670]"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {slideDeckData.map((s, i) => (
                  <motion.button
                    key={s.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation()
                      jump(i)
                    }}
                    className={`group rounded-3xl border p-5 text-left transition-all hover:-translate-y-1 ${
                      i === index
                        ? 'card-glow border-[#f5b93b] bg-gradient-to-br from-[#f5b93b]/25 to-white/90 ring-2 ring-[#f5b93b]'
                        : 'border-[#35459c]/15 bg-white/85 hover:border-[#f5b93b]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-extrabold text-[#35459c]/25 group-hover:text-[#e9a313]/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {i === index && (
                        <span className="rounded-full bg-[#35459c] px-2.5 py-0.5 text-[10px] font-bold text-white">
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    <p className="font-display mt-3 font-bold text-[#2c3670]">{s.title}</p>
                    <p className="mt-1 text-xs text-[#35459c]/65 line-clamp-2">
                      {s.keyPoints[0] || 'Lihat detail slide'}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaker Notes Modal */}
      <SpeakerNotesModal
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        currentSlideIndex={index}
        totalSlides={slideDeckData.length}
        slideTitle={currentSlide.title}
        keyPoints={currentSlide.keyPoints}
        notes={currentSlide.notes}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={() => setIsTimerRunning((r) => !r)}
        onResetTimer={() => setTimerSeconds(0)}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  )
}
