import type { NextPage } from "next"

export const Footer: NextPage = () => {
    return (
        <div className="sticky bottom-0 w-screen bg-zinc-300 text-center text-sm text-gray-400 py-3">
            <a href="https://over40webclub.netlify.app/" target="_blank" rel="noreferrer">yoko</a>
            {` `}
            {`©${new Date().getFullYear()}`}
        </div>
    )
}
