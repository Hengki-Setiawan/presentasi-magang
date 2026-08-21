// Synthesized sound effects using Web Audio API (Zero external audio files required)

class SoundFX {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    // Load preference from localStorage (guard SSR)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('afila_presentation_sound_muted')
        if (saved !== null) {
          this.enabled = saved !== 'true'
        }
      }
    } catch {
      // ignore - e.g. privacy mode blocks localStorage
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }

  public isMuted(): boolean {
    return !this.enabled
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('afila_presentation_sound_muted', (!this.enabled).toString())
      }
    } catch {
      // ignore
    }
    if (this.enabled) {
      this.playTick()
    }
    return !this.enabled
  }

  public playSlideChange(direction: number = 1) {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      const baseFreq = direction >= 0 ? 320 : 440
      const endFreq = direction >= 0 ? 480 : 280

      osc.type = 'sine'
      osc.frequency.setValueAtTime(baseFreq, now)
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.15)
    } catch {
      // Ignore audio autoplay restrictions
    }
  }

  public playTick() {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.06)
    } catch {
      // Ignore
    }
  }

  public playPop() {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.1)
    } catch {
      // Ignore
    }
  }
}

export const soundFX = new SoundFX()
