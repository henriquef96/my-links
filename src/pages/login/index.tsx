import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { Footer } from "../../components/footer"

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin", { replace: true });
        } catch {
            setError('E-mail ou senha inválidos');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="
                    relative z-10
                    w-full max-w-md mx-auto
                    px-8 py-10
                    rounded-2xl
                    bg-white dark:bg-gray-800
                    shadow-xl shadow-gray-200/50 dark:shadow-black/40
                    border border-gray-100 dark:border-gray-700">

                <div className="flex flex-col items-center mb-4">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="E-mail"
                        placeholder="seuemail@dominio.com"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading} />

                    <div className="relative">
                        <Input
                            label="Senha"
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={loading} />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
                                absolute right-3 top-[38px]
                                text-gray-400 hover:text-gray-600
                                dark:text-gray-500
                                transition ">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && (
                        <span className="text-sm text-red-500">
                            {error}
                        </span>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            cursor-pointer
                            mt-4 h-11 rounded-xl
                            flex items-center justify-center
                            font-semibold text-white
                            transition-all
                            ${loading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : `bg-blue-600 hover:bg-blue-700
                                    shadow-md hover:shadow-lg
                                    active:scale-[0.98]`
                            }`
                        }>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
            <div className="fixed bottom-5"> 
                <Footer />
            </div>
        </div>
    )
}