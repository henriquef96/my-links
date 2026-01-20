import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import {
  Link2,
  Palette,
  Layout,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from 'lucide-react'

import { db } from '../../services/firebaseConnection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'

interface LinkProps {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

export function Admin() {
  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [colorInput, setColorInput] = useState('#2B7FFF')
  const [urlColorInput, setUrlColorInput] = useState('#FFFFFF')

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null)

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const q = query(collection(db, 'links'), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: LinkProps[] = []

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        })
      })

      setLinks(lista)
    })

    return unsubscribe
  }, [])

  async function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (!nameInput || !urlInput) {
      setModalType('error')
      setShowModal(true)
      setTimeout(() => setShowModal(false), 3000)
      return
    }

    await addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: colorInput,
      color: urlColorInput,
      created: new Date(),
    })

    setNameInput('')
    setUrlInput('')
    setModalType('success')
    setShowModal(true)
    setTimeout(() => setShowModal(false), 3000)
  }

  function handleDeleteLink(id: string) {
    deleteDoc(doc(db, 'links', id))
  }

  return (
    <div className="min-h-screen bg-[#101828] text-white">
      <Header />

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
            <div
              className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${
                modalType === 'success'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {modalType === 'success' ? (
                <CheckCircle2 size={32} />
              ) : (
                <AlertCircle size={32} />
              )}
            </div>

            <h2 className="text-2xl font-bold">
              {modalType === 'success' ? 'Sucesso!' : 'Erro'}
            </h2>

            <p className="mt-2 text-gray-400">
              {modalType === 'success'
                ? 'Link cadastrado com sucesso.'
                : 'Preencha todos os campos.'}
            </p>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl p-8 shadow-2xl
          "
        >
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <Layout className="text-blue-400" />
            Gerenciar links
          </h1>

          <label className="text-sm text-gray-300 mb-2 block">
            Nome do link
          </label>
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Ex: Meu Instagram"
          />

          <label className="text-sm text-gray-300 mt-4 mb-2 block flex items-center gap-2">
            <Link2 size={16} />
            URL
          </label>
          <Input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
          />

          {/* CORES */}
          <section className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400 flex items-center gap-2 mb-2">
                <Palette size={14} /> Fundo
              </span>
              <input
                type="color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400 flex items-center gap-2 mb-2">
                <Palette size={14} /> Texto
              </span>
              <input
                type="color"
                value={urlColorInput}
                onChange={(e) => setUrlColorInput(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </section>

          {/* PREVIEW */}
          {nameInput && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-xs text-gray-400 mb-4">
                VISUALIZAÇÃO
              </p>
              <div
                className="mx-auto max-w-sm rounded-xl py-4 text-center font-bold shadow-md"
                style={{ backgroundColor: colorInput, color: urlColorInput }}
              >
                {nameInput}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="
              mt-8 h-12 w-full rounded-xl
              bg-blue-600 hover:bg-blue-700
              font-bold transition
              flex items-center justify-center gap-2
            "
          >
            Cadastrar
            <Link2 size={18} />
          </button>
        </form>

        {/* LISTA (SÓ APARECE SE TIVER LINKS) */}
        {links.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Layout className="text-blue-400" />
              Links cadastrados
            </h2>

            {links.map((link) => (
              <div
                key={link.id}
                style={{ backgroundColor: link.bg, color: link.color }}
                className="
                  flex items-center justify-between
                  rounded-xl py-4 px-6 mb-3
                  shadow-lg transition hover:scale-[1.02]
                "
              >
                {link.name}

                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-1 rounded hover:bg-black/20"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
