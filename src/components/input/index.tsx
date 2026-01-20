import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {/* LABEL */}
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}

        {/* INPUT */}
        <input
          ref={ref}
          {...props}
          className={`
            w-full h-11 px-4 rounded-xl

            bg-white/5 backdrop-blur-md
            border border-white/10
            text-white
            placeholder:text-gray-400

            shadow-inner
            transition-all duration-200

            focus:outline-none
            focus:border-blue-500/60
            focus:ring-2 focus:ring-blue-500/30

            hover:border-white/20

            disabled:opacity-50
            disabled:cursor-not-allowed

            ${error ? 'border-red-500/60 focus:ring-red-500/30' : ''}
            ${className}
          `}
        />

        {/* ERROR */}
        {error && (
          <span className="text-xs text-red-400 mt-1">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
