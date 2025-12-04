import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { useState } from "react";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({
            email: email,
            password: password
        });
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center ">
            <div className="flex flex-col w-full sm:w-95 items-center shadow-lg p-4 rounded-md h-screen sm:h-100 justify-center bg-neutral-200">
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

                    <button type="submit" className="p-1 bg-neutral-400 rounded-md w-80 sm:w-85 mt-4 text-white font-semibold hover:bg-neutral-500 transition cursor-pointer shadow-md hover:shadow-sm">
                        Acessar
                    </button>
                </form>
            </div>
        </div >
    )
}