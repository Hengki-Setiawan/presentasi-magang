/// <reference types="vite/client" />

declare module 'lucide-react' {
  import * as React from 'react'
  export type LucideProps = React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string; strokeWidth?: number | string }
  export type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const LayoutGrid: LucideIcon
  export const Maximize: LucideIcon
  export const Minimize: LucideIcon
  export const X: LucideIcon
  export const Volume2: LucideIcon
  export const VolumeX: LucideIcon
  export const Play: LucideIcon
  export const Pause: LucideIcon
  export const MessageSquareQuote: LucideIcon
  export const Keyboard: LucideIcon
  export const Share2: LucideIcon
  export const Clock: LucideIcon
  export const Check: LucideIcon
  export const Sparkles: LucideIcon
  export const Users: LucideIcon
  export const FileCode2: LucideIcon
  export const ClipboardCheck: LucideIcon
  export const Rocket: LucideIcon
  export const Bot: LucideIcon
  export const Database: LucideIcon
  export const MessageSquare: LucideIcon
  export const Wrench: LucideIcon
  export const ArrowRightLeft: LucideIcon
  export const Flag: LucideIcon
  export const Map: LucideIcon
  export const ShoppingBag: LucideIcon
  export const Quote: LucideIcon
  export const Heart: LucideIcon
  export const GraduationCap: LucideIcon
  export const Workflow: LucideIcon
  export const Bug: LucideIcon
  export const Webhook: LucideIcon
  export const BrainCircuit: LucideIcon
  export const TestTube2: LucideIcon
  export const Network: LucideIcon
  export const Split: LucideIcon
  export const Route: LucideIcon
  export const Search: LucideIcon
  export const ImagePlus: LucideIcon
  export const Film: LucideIcon
  export const Loader2: LucideIcon
  export const Maximize2: LucideIcon
  export const CheckCircle2: LucideIcon
  export const RotateCcw: LucideIcon
  const _default: Record<string, LucideIcon>
  export default _default
}
