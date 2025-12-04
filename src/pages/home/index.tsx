import { Social } from '../../components/social';
import { Logo } from '../../components/logo';

export function Home() {
    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">

            <div className="flex flex-col w-full h-screen items-center justify-center">
                <Logo />

                <main >
                    <section className='bg-neutral-100 shadow-xl hover:shadow-lg mb-1 sm:mb-3 w-90 sm:w-110 rounded-md scale-85 transition sm:scale-100'>
                        <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-1'>
                            <p className='flex flex-col items-center'> GitHub</p>
                        </a>
                    </section>
                </main>

                <footer className='flex flex-row w-80 sm:w-115  justify-between'>
                    <Social />
                </footer>
            </div>

        </div>
    )
}