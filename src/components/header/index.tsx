import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';

export function Header() {
    async function handleLogOut() {
        await signOut(auth);
    }

    return (
        <header className='bg-blue-600 text-white shadow-md'>
            <nav className='flex justify-between px-4 py-2'>
                <div className='items-center font-medium flex gap-5'>
                    <Link to="/">Home</Link>
                    <Link to="/">Links</Link>
                    <Link to="/admin/social">Redes sociais</Link>
                </div>
                <button onClick={handleLogOut} className='cursor-pointer text-white'><BiLogOut size={30} /></button>
            </nav>
        </header>
    )
}