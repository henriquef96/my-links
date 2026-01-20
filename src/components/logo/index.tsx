export function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div
        className="
          w-10 h-10 rounded-xl
          bg-gradient-to-br from-blue-500 to-blue-700
          flex items-center justify-center
          shadow-lg
        "
      >
        <span className="text-white font-black text-lg">M</span>
      </div>

      <span className="text-3xl font-bold text-white">
        My
        <span className="text-blue-400">Links</span>
      </span>
    </div>
  )
}
