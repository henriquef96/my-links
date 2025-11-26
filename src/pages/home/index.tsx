import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


export function Home() {
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">

            <h1 className="md:text-4xl text-3xl text-neutral-800 font-bold mt-20">Henrique Farias</h1>
            <span className="text-neutral-700 mb-5 mt-3">Veja meus links 👇</span>

            <main >
                <section className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-90 sm:w-110 rounded-md scale-85 transition-transform hover:scale-90 sm:scale-100'>
                    <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-1'>
                        <p className='flex flex-col items-center'> GitHub</p>
                    </a>
                </section>

            </main>

            <footer className='flex flex-row w-80 sm:w-115  justify-between'>
                <div className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-100 rounded-xl scale-85 transition-transform hover:scale-80 sm:scale-85'>
                    <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-3'>
                        <p className='flex flex-col items-center'><FaGithub className='text-5xl' /> GitHub</p>
                    </a>
                </div>

                <div className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-100 rounded-xl scale-85 transition-transform hover:scale-80 sm:scale-85'>
                    <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-3'>
                        <p className='flex flex-col items-center'><FaLinkedin className='text-5xl' /> Linkedin</p>
                    </a>
                </div>

                <div className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-100 rounded-xl scale-85 transition-transform hover:scale-80 sm:scale-85'>
                    <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-3'>
                        <p className='flex flex-col items-center'><FaWhatsapp className='text-5xl' /> WhatsApp</p>
                    </a>
                </div>
            </footer>
        </div>
    )
}