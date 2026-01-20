import { Logo } from '../../components/logo'
import { SocialIcons } from '../../components/social'
import { LinksList } from '../../components/links'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'

export function Home() {
  const date = new Date()

  return (
    <div
      className="
        min-h-screen bg-gray-50 dark:bg-gray-900
        flex flex-col items-center justify-center px-4
      "
    >
      {/* CARD PRINCIPAL */}
      <div
        className="
          relative
          w-full max-w-md
          bg-white dark:bg-gray-800
          shadow-xl shadow-gray-200/50
          dark:shadow-black/30
          rounded-2xl border border-gray-100 dark:border-gray-700
          p-8 flex flex-col items-center
          animate-in fade-in duration-500
        "
      >
        {/* BOTÃO ADMIN */}
        <Link
          to="/admin"
          className="
            absolute top-4 right-4
            p-2 rounded-full
            text-gray-400 hover:text-blue-500
            hover:bg-gray-100 dark:hover:bg-white/10
            transition-all
          "
          title="Acessar painel administrativo"
        >
          <Settings size={20} />
        </Link>

        <Logo />

        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4">
          Veja meus links 👇
        </h1>

        {/* LINKS DINÂMICOS */}
        <LinksList />

        {/* REDES SOCIAIS */}
        <div className="mt-6">
          <SocialIcons />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-6 text-center text-sm text-gray-400">
        <span>Desenvolvido por Henrique Farias</span>
        <br />
        <span>Copyright © {date.getFullYear()}</span>
      </footer>
    </div>
  )
}
