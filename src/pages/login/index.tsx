import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (email === '' || password === '') {
            alert("Preencha todos os campos!");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Usuário logado com sucesso!");
                navigate("/admin", { replace: true });
            })
            .catch((error) => {
                console.log("Erro ao logar usuário:", error);
                alert("Erro ao logar usuário. Verifique suas credenciais.");
            });
    }

    const date = new Date();

    return (
        <div className="flex flex-col h-screen items-center justify-center ">
            <div className="flex flex-col w-full sm:w-95 items-center shadow-lg p-4 rounded-md h-screen sm:h-100 justify-center bg-neutral-100">

                <Link to={"/"}>
                    <Logo />
                </Link>

                <form onSubmit={handleSubmit}>

                    <Input
                        placeholder="Digite seu e-mail..."
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="*********"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit" className="p-1 bg-blue-500 rounded-md w-80 sm:w-85 mt-4 text-white font-semibold hover:bg-blue-600 transition cursor-pointer shadow-md hover:shadow-sm">
                        Acessar
                    </button>
                </form>

            </div>

            <footer className='fixed bottom-3 text-neutral-400 text-sm'>
                <span>copyright © {date.getFullYear()}</span>
            </footer>
        </div >
    )
}