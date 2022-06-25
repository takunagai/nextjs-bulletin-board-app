import { HeadPart } from "../components/HeadPart"
import { Footer } from "../components/Footer"
import dynamic from "next/dynamic"

const DynamicMain = dynamic(() =>
    import("../components/Main"), { ssr: false }
)

const Home = () => {
    return (
        <>
            <HeadPart/>
            <div className="grid grid-rows-[1fr, auto]">
                <div className="min-h-[90vh]">
                    <DynamicMain/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Home
