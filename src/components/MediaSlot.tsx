import { useCallback, useEffect, useRef, useState } from 'react'
import { ImagePlus, Film, X, Loader2, Maximize2 } from 'lucide-react'
import { getMediaFromDB, saveMediaToDB, deleteMediaFromDB } from '@/lib/mediaStorage'
import { soundFX } from '@/lib/soundFx'

interface MediaSlotProps {
  id?: string
  kind: 'image' | 'video'
  label?: string
  className?: string
  ratio?: string // e.g. '16/9', '4/3', '1/1', '16/7'
}

export function MediaSlot({ id, kind, label, className = '', ratio = '16/9' }: MediaSlotProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [dragOver, setDragOver] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  // Load from IndexedDB on mount - with proper URL cleanup
  useEffect(() => {
    let active = true
    if (!id) return

    setLoading(true)
    getMediaFromDB(id)
      .then((stored) => {
        if (!active) return
        if (stored?.file) {
          const url = URL.createObjectURL(stored.file)
          objectUrlRef.current = url
          setSrc(url)
        }
      })
      .catch((err) => console.error('Failed to load media:', err))
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      // Cleanup object URL on unmount or id change
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [id])

  const accept = kind === 'image' ? 'image/*' : 'video/*'

  const handleFile = useCallback(
    async (file?: File | null) => {
      if (!file) return
      if (kind === 'image' && !file.type.startsWith('image/')) return
      if (kind === 'video' && !file.type.startsWith('video/')) return

      setLoading(true)
      try {
        if (id) {
          await saveMediaToDB(id, file)
        }
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current)
          objectUrlRef.current = null
        }
        const url = URL.createObjectURL(file)
        objectUrlRef.current = url
        setSrc(url)
        soundFX.playPop()
      } catch (err) {
        console.error('Error storing media file:', err)
      } finally {
        setLoading(false)
      }
    },
    [id, kind],
  )

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
      setSrc(null)
      if (id) {
        try {
          await deleteMediaFromDB(id)
        } catch (err) {
          console.error('Failed to delete media:', err)
        }
      }
      soundFX.playTick()
    },
    [id],
  )

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          src
            ? 'border-transparent card-glow bg-black/5 shadow-md'
            : dragOver
              ? 'border-[#f5b93b] bg-[#f5b93b]/15 scale-[1.02]'
              : 'border-dashed border-[#35459c]/30 bg-white/70 hover:border-[#f5b93b] hover:bg-[#f5b93b]/10'
        } ${className}`}
        style={{ aspectRatio: ratio }}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDragOver(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (!src && !loading) inputRef.current?.click()
        }}
        role="button"
        aria-label={label ?? (kind === 'image' ? 'Tambah gambar' : 'Tambah video')}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
          onClick={(e) => e.stopPropagation()}
        />

        {loading ? (
          <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-[#35459c]" />
          </div>
        ) : src ? (
          <>
            {kind === 'image' ? (
              <img
                src={src}
                alt={label ?? 'Dokumentasi'}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <video
                src={src}
                controls
                className="h-full w-full object-cover"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Overlay controls */}
            <div className="absolute right-2 top-2 z-20 flex items-center gap-1.5 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
              {kind === 'image' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsZoomed(true)
                  }}
                  className="rounded-full bg-[#35459c]/85 p-1.5 text-white shadow hover:bg-[#35459c]"
                  title="Perbesar foto"
                  aria-label="Perbesar foto"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="rounded-full bg-red-600/85 p-1.5 text-white shadow hover:bg-red-700"
                title="Hapus media"
                aria-label="Hapus media"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="rounded-2xl bg-[#35459c]/10 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#f5b93b]/30">
              {kind === 'image' ? (
                <ImagePlus className="h-5 w-5 text-[#35459c]" />
              ) : (
                <Film className="h-5 w-5 text-[#35459c]" />
              )}
            </div>
            <p className="text-xs font-bold text-[#2c3670]">
              {label ?? (kind === 'image' ? 'Unggah Gambar' : 'Unggah Video')}
            </p>
            <p className="text-[10px] font-medium text-[#35459c]/60">
              Klik atau drag &amp; drop file
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal for Images */}
      {isZoomed && src && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomed(false)
          }}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl">
            <img src={src} alt="Zoom preview" className="max-h-[90vh] max-w-[90vw] object-contain" />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
