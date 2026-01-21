export function Footer() {
    const date = new Date()

    return (
        <footer className="text-center text-sm text-gray-400">
            <span>Desenvolvido por Henrique Farias</span>
            <br />
            <span>Copyright © - {date.getFullYear()}</span>
        </footer>
    )
}