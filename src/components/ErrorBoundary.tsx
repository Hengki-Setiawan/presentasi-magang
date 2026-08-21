import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallbackTitle?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
          <div className="card-glow max-w-lg rounded-3xl border border-red-200 bg-white/90 p-8">
            <h2 className="font-display text-xl font-bold text-[#2c3670]">
              {this.props.fallbackTitle || 'Terjadi Kesalahan'}
            </h2>
            <p className="mt-2 text-sm text-[#35459c]/70">
              Slide gagal dimuat. Coba refresh halaman atau kembali ke slide sebelumnya.
            </p>
            {this.state.error && (
              <pre className="mt-4 max-h-32 overflow-auto rounded-xl bg-[#35459c]/5 p-3 text-left text-xs text-[#35459c]">
                {this.state.error.message}
              </pre>
            )}
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="rounded-full bg-[#35459c] px-5 py-2 text-sm font-bold text-white hover:bg-[#2c3670]"
              >
                Coba Lagi
              </button>
              <button
                onClick={() => window.location.reload()}
                className="rounded-full border border-[#35459c]/20 px-5 py-2 text-sm font-bold text-[#35459c] hover:bg-[#f5b93b]/20"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
