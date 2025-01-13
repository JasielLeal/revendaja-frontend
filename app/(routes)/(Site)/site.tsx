import { Beneficios } from "./components/beneficios";
import { Catalogo } from "./components/catalogo";
import { Hero } from "./components/hero";
import { MobileNavBar } from "./components/mobileNavBar";

export function Site() {
    return (
        <>
            <div className="bg-[#F6F9FC] bg-[url('/grade3.png')] bg-cover bg-center pb-20">

                <MobileNavBar />
                <Hero />

            </div>
            <div className="bg-[#F6F9FC]">
                <Catalogo />
            </div>
            <div className="bg-[#F6F9FC]">
                <Beneficios />
            </div>
        </>
    )
}