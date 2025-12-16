import { type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input(props: InputProps) {
    return (
        <div>
            <input className="transition shadow-md hover:shadow-sm px-2 rounded-md mb-2 sm:mb-3 w-80 sm:w-85 bg-transparent" required {...props} />
        </div>
    )
}