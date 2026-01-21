import { BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Header() {
  const location = useLocation()

  async function handleLogOut() {
    await signOut(auth)
  }

  function isActive(path: string) {
    return location.pathname === path
  }

  return (
    <header className="
      sticky top-0 z-40
      bg-white/80 dark:bg-zinc-900/80
      backdrop-blur
      border-b border-gray-200 dark:border-zinc-700
      shadow-sm
      transition-colors">
      <nav className="mx-auto px-4 py-3 flex items-center justify-between">

        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link
            to="/"
            className={`
              transition-colors
              ${isActive('/')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }
            `}
          >
            Home
          </Link>

          <Link
            to="/admin"
            className={`
              transition-colors
              ${isActive('/admin')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }
            `}
          >
            Links
          </Link>

          <Link
            to="/admin/social"
            className={`
              transition-colors
              ${isActive('/admin/social')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }
            `}
          >
            Redes sociais
          </Link>
        </div>

        <button
          onClick={handleLogOut}
          className="
            flex items-center justify-center
            p-2 rounded-xl
            text-gray-500 dark:text-gray-400
            hover:text-zinc-600 dark:hover:text-zinc-200
            hover:bg-gray-100 dark:hover:bg-zinc-800
            transition-all
            active:scale-95 cursor-pointer"
          title="Sair"
        >
          <BiLogOut size={22} />
        </button>
      </nav>
    </header>
  )
}
