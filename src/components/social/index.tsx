import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export function Social() {
    return (
        <>
            <div className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-50 rounded-xl scale-85 transition hover:scale-80 sm:scale-85'>
                <a href="https://github.com/henriquef96" target="blank" className='flex flex-col items-center p-3'>
                    <p className='flex flex-col items-center'><FaGithub className='text-5xl' /> GitHub</p>
                </a>
            </div>

            <div className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-50 rounded-xl scale-85 transition hover:scale-80 sm:scale-85'>
                <a href="https://www.linkedin.com/in/henrique-farias-21aa4b276/" target="blank" className='flex flex-col items-center p-3'>
                    <p className='flex flex-col items-center'><FaLinkedin className='text-5xl' /> Linkedin</p>
                </a>
            </div>

            <div className='bg-neutral-100 shadow-xl hover:shadow-lg mb-5 w-50 rounded-xl scale-85 transition hover:scale-80 sm:scale-85'>
                <a href="https://api.whatsapp.com/send/?phone=41998524072" target="blank" className='flex flex-col items-center p-3'>
                    <p className='flex flex-col items-center'><FaWhatsapp className='text-5xl' /> WhatsApp</p>
                </a>
            </div></>
    )
}