import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const date = new Date();

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
        <div
            className="
                relative flex min-h-screen items-center justify-center
                bg-gray-50 dark:bg-gray-900
            "
        >

            {/* MARCA D'ÁGUA */}
            <span
                className="
                    pointer-events-none select-none absolute
                    text-[140px] font-black
                    text-gray-200/40 dark:text-gray-800/40
                    rotate-[-20deg]
                "
            >
                LOGIN
            </span>

            {/* CARD */}
            <div
                className="
                    relative z-10
                    w-full max-w-md mx-auto
                    px-8 py-10
                    rounded-2xl
                    bg-white dark:bg-gray-800
                    shadow-xl shadow-gray-200/50 dark:shadow-black/40
                    border border-gray-100 dark:border-gray-700
                "
            >

                {/* LOGO */}
                <div className="flex flex-col items-center mb-4">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <Input
                        label="E-mail"
                        placeholder="seuemail@email.com"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    {/* SENHA */}
                    <div className="relative">
                        <Input
                            label="Senha"
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
                                absolute right-3 top-[38px]
                                text-gray-400 hover:text-gray-600
                                dark:text-gray-500 dark:hover:text-gray-300
                                transition
                            "
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* ERRO */}
                    {error && (
                        <span className="text-sm text-red-500">
                            {error}
                        </span>
                    )}

                    {/* BOTÃO */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            mt-4 h-11 rounded-xl
                            flex items-center justify-center
                            font-semibold text-white
                            transition-all
                            ${loading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : `
                                    bg-blue-600 hover:bg-blue-700
                                    shadow-md hover:shadow-lg
                                    active:scale-[0.98]
                                  `
                            }
                        `}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>

            {/* FOOTER */}
            <footer className="absolute bottom-4 text-gray-400 dark:text-gray-500 text-xs text-center">
                <span>© {date.getFullYear()} — Henrique Farias</span>
            </footer>
        </div>
    );
}
