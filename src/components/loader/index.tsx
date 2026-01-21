import { Loader2 } from 'lucide-react'
import { Logo } from '../logo'

export function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101828]">
      <div
        className="
          flex flex-col items-center gap-6
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl px-10 py-12
          shadow-2xl">

        <Logo />

        <div className="flex items-center gap-3 text-gray-300">
          <Loader2 className="animate-spin text-blue-400" size={22} />
          <span className="text-sm font-medium">
            Verificando autenticação...
          </span>
        </div>

        <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="
              h-full w-1/3
              bg-blue-500
              animate-pulse
              rounded-full"/>
        </div>
      </div>
    </div>
  )
}
