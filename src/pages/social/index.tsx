import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { useState, useEffect, type FormEvent } from 'react'
import { db } from '../../services/firebaseConnection'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  Layout,
  GithubIcon,
  LinkedinIcon,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

export function Social() {
  const [gitHubInput, setGitHubInput] = useState('')
  const [linkedinInput, setLinkedinInput] = useState('')
  const [whatsAppInput, setWhatsAppInput] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    document.title = 'Minhas Redes Sociais - Meus Links'

    async function loadLinks() {
      const ref = doc(db, 'social', 'link')
      const snapshot = await getDoc(ref)

      if (snapshot.exists()) {
        setGitHubInput(snapshot.data()?.github || '')
        setLinkedinInput(snapshot.data()?.linkedin || '')
        setWhatsAppInput(snapshot.data()?.whatsapp || '')
      }
    }

    loadLinks()
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (!gitHubInput || !linkedinInput || !whatsAppInput) {
      setModalType('error')
      setShowModal(true)
      setTimeout(() => setShowModal(false), 3000)
      return
    }

    setDoc(doc(db, 'social', 'link'), {
      github: gitHubInput,
      linkedin: linkedinInput,
      whatsapp: whatsAppInput,
    }).then(() => {
      setModalType('success')
      setShowModal(true)
      setTimeout(() => setShowModal(false), 3000)
    })
  }

  return (
    <div className="min-h-screen bg-[#101828]">
      <Header />

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full text-center">
            <div
              className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full
                ${
                  modalType === 'success'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
            >
              {modalType === 'success' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
            </div>

            <h2 className="text-2xl font-bold text-white">
              {modalType === 'success' ? 'Sucesso!' : 'Erro'}
            </h2>

            <p className="mt-2 text-gray-400">
              {modalType === 'success'
                ? 'Redes sociais salvas com sucesso.'
                : 'Preencha todos os campos.'}
            </p>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-10">
        <form
          onSubmit={handleRegister}
          className="
   bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl p-8 shadow-2xl
          "
        >
          {/* TITLE */}
          <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Layout className="text-blue-400" />
            Minhas redes sociais
          </h1>

          {/* GITHUB */}
          <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <GithubIcon size={16} />
            GitHub
          </label>
          <Input
            placeholder="https://github.com/seuusuario"
            value={gitHubInput}
            onChange={(e) => setGitHubInput(e.target.value)}
            className="mb-4"
          />

          {/* LINKEDIN */}
          <label className="text-sm font-medium text-gray-300 mb-2 mt-4 flex items-center gap-2">
            <LinkedinIcon size={16} />
            LinkedIn
          </label>
          <Input
            placeholder="https://linkedin.com/in/seuusuario"
            value={linkedinInput}
            onChange={(e) => setLinkedinInput(e.target.value)}
            className="mb-4"
          />

          {/* WHATSAPP */}
          <label className="text-sm font-medium text-gray-300 mb-2 mt-4 flex items-center gap-2">
            <MessageCircle size={16} />
            WhatsApp
          </label>
          <Input
            placeholder="https://wa.me/5541999999999"
            value={whatsAppInput}
            onChange={(e) => setWhatsAppInput(e.target.value)}
            className="mb-8"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full h-12 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white font-semibold
              transition-all
              hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
              active:scale-[0.97]
            "
          >
            Salvar redes sociais
          </button>
        </form>
      </main>
    </div>
  )
}
