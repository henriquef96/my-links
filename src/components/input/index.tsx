import { type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input(props: InputProps) {
    return (
        <div>
            <input className="transition shadow px-2 rounded mb-2 w-80 sm:w-85 bg-transparent" {...props} />
        </div>
    )
}