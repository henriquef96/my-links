import { Logo } from '../../components/logo'
import { SocialIcons } from '../../components/social'
import { LinksList } from '../../components/links'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { Footer } from '../../components/footer'

export function Home() {
  const date = new Date()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <div
        className="
          relative
          w-full max-w-md
          bg-white dark:bg-gray-800
          shadow-xl shadow-gray-200/50
          dark:shadow-black/30
          rounded-2xl border border-gray-100 dark:border-gray-700
          p-8 flex flex-col items-center
          animate-in fade-in duration-500">

        <Link
          to="/admin"
          className="
            absolute top-4 right-4
            p-2 rounded-full
            text-gray-400 hover:text-blue-500
            hover:bg-gray-100 dark:hover:bg-white/10
            transition-all rotate-90 hover:rotate-0"
          title="Acessar painel administrativo">
          <Settings size={20} />
        </Link>

        <Logo />
        <LinksList />
        <SocialIcons />
      </div>
      <div className='fixed bottom-5'>
        <Footer />
      </div>
    </div>
  )
}
