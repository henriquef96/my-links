import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { Link2, Palette, Layout, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [colorInput, setColorInput] = useState('#2B7FFF');
    const [urlColorInput, setUrlColorInput] = useState('#FFFFFF');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
                                console.log(links)

                setLinks(lista);
                console.log(links)
            })
                            console.log(links)

        });
                console.log(links)

        return unsubscribe();
    }, []);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput === '' || urlInput === '') {
            setModalType('error');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
            return;
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: colorInput,
            color: urlColorInput,
            created: new Date()
        })

            .then(() => {
                console.log('Link cadastrado com sucesso!');
            })
            .catch((error) => {
                console.log('Erro ao cadastrar link: ', error);
            });

        setModalType('success');
        setShowModal(true);
        setNameInput('');
        setUrlInput('');
        setTimeout(() => setShowModal(false), 3000);
    }

    return (
        <div className="flex flex-col min-h-screen pb-7 bg-gray-50">
            <Header />

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-all px-4 " onClick={() => setShowModal(false)}>
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-in zoom-in duration-300 relative">

                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${modalType === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                            {modalType === 'success' ? (
                                <CheckCircle2 size={32} strokeWidth={2.5} />
                            ) : (
                                <AlertCircle size={32} strokeWidth={2.5} />
                            )}
                        </div>

                        <h2 className={`text-2xl font-bold ${modalType === 'success' ? 'text-green-700' : 'text-red-700'
                            }`}>
                            {modalType === 'success' ? 'Sucesso!' : 'Ops, faltou algo!'}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {modalType === 'success'
                                ? 'Seu novo link foi cadastrado com sucesso.'
                                : 'Preencha o nome e a URL para poder cadastrar.'}
                        </p>
                    </div>
                </div>
            )}

            <main className="flex-1 w-full max-w-2xl mx-auto px-4 mt-8">
                <form onSubmit={handleRegister} className='bg-white w-full flex flex-col p-8 shadow-xl shadow-gray-200/50 rounded-2xl borderborder-gray-100'>

                    <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Layout size={24} className="text-blue-600" />
                        Gerenciar links
                    </h1>

                    <label htmlFor="name" className='text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2'>Nome do link
                    </label>
                    <Input
                        id="name"
                        placeholder='Ex: Meu Instagram'
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="mb-4 border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    />

                    <label htmlFor="url" className='text-sm font-semibold text-gray-600 mb-2 mt-2 flex items-center gap-2'>
                        <Link2 size={16} /> URL do link</label>
                    <Input
                        id="url"
                        type="url"
                        placeholder='https://...'
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="mb-6 border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    />

                    <section className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-200'>

                            <span className='mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2'>
                                <Palette size={14} /> Cor do Fundo
                            </span>

                            <div className="flex items-center gap-3">
                                <input
                                    className='w-10 h-10 cursor-pointer rounded-lg border-none bg-transparent'
                                    type="color"
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)} />

                                <span className="text-sm font-mono text-gray-600 uppercase">{colorInput}</span>
                            </div>
                        </div>

                        <div className='flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-200'>

                            <span className='mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2'>
                                <Palette size={14} /> Cor do Texto
                            </span>

                            <div className="flex items-center gap-3">
                                <input
                                    className='w-10 h-10 cursor-pointer rounded-lg border-none bg-transparent'
                                    type="color"
                                    value={urlColorInput}
                                    onChange={(e) => setUrlColorInput(e.target.value)}
                                />

                                <span className="text-sm font-mono text-gray-600 uppercase">{urlColorInput}</span>
                            </div>
                        </div>
                    </section>

                    {nameInput !== '' && (
                        <div className='mt-10 pt-8 border-t border-gray-100 '>
                            <label className='block text-center text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest'>Visualização</label>
                            <article
                                className='w-full max-w-sm mx-auto flex items-center justify-center rounded-xl py-4 px-6 shadow-md transition-all hover:shadow-blue-200 hover:shadow-lg cursor-pointer'
                                style={{ backgroundColor: colorInput, marginBottom: 8 }}
                            >
                                <p className='font-bold text-lg' style={{ color: urlColorInput }}>{nameInput}</p>
                            </article>
                        </div>
                    )}

                    <button
                        type="submit"
                        className='bg-blue-600 text-white h-12 rounded-xl mt-8 font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center cursor-pointer'>
                        Cadastrar<Link2 size={20} className="inline-block ml-2" />
                    </button>
                </form>

                <article className='bg-white w-full flex flex-col p-8 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100'>
                    <h2 className="text-2xl font-bold text-gray-800 mt-16 mb-6 flex items-center gap-2">
                        <Layout size={24} className="text-blue-600" />
                        Links cadastrados
                    </h2>

                    <span
                        className='w-full max-w-sm mx-auto flex items-center justify-between rounded-xl py-4 px-6 shadow-md transition-all hover:shadow-blue-200 hover:shadow-lg cursor-pointer bg-blue-500 text-white font-bold'>Teste

                        <div>
                            <button className='border border-dashed p-1 rounded'><Trash2 size={20} className='' /></button>
                        </div></span>

                </article>
            </main>
        </div>
    )
}