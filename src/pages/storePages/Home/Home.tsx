import { IoChevronForwardCircle } from "react-icons/io5";
import { OnSale } from "./components/OnSale";


export function Home() {



    return (
        <>
            <div className="bg-[url('./bgTemp.png')] w-full h-44 rounded-lg flex flex-col items-center justify-center mb-10">
                <p className="text-3xl uppercase font-bold text-white">Reinvente-se</p>
                <p className="font-medium text-white">Descubra cosméticos pensados para você</p>
            </div>

            <div className="flex items-center justify-between mb-5 ">
                <p className="font-extrabold text-xl uppercase text-text">Promoções </p>
                <div className="flex items-center gap-1 font-semibold text-primary">
                    <a href="http://">
                        Ver todas
                    </a>
                    <p>
                        <IoChevronForwardCircle size={20} />
                    </p>
                </div>
            </div>



            <div className="mb-10">
                <OnSale />
            </div>
        </>
    )
}