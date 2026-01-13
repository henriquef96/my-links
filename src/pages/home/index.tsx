import { Social } from '../../components/social';
import { Logo } from '../../components/logo';

export function Home() {

    const date = new Date();

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">

            <div className="flex flex-col w-full h-screen items-center justify-center">
                <Logo />

                <main className='text-center'>
                    <span >Veja meus links 👇</span>
                    <section className='bg-neutral-100 shadow-xl hover:shadow-lg mb-1 sm:mb-3 w-90 sm:w-110 rounded-md scale-85 transition sm:scale-100'>
                        <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-1 '>
                            <p className='flex flex-col items-center '> GitHub</p>
                        </a>
                    </section>

                    <section className='flex flex-row w-80 sm:w-115  justify-between'>
                        <Social />
                    </section>
                </main>

                <footer className='fixed bottom-3 text-neutral-400 text-sm text-center'>
                    <span>Desenvolvido por Henrique Farias</span><br />
                    <span>Copyright © {date.getFullYear()}</span>
                </footer>
            </div>

        </div>
    )
}