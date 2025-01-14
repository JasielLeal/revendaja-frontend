import { IoDiceOutline, IoFemale, IoMaleOutline } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";
import Link from "next/link";

export function Categories() {
    return (
        <div className="bg-[#F1F1F1] px-3 pt-5">
            <div className="flex items-center justify-between">
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <Link href={'/search?query=masculino'}>
                            <IoMaleOutline size={20} />
                        </Link>
                    </div>
                    <p className="text-text text-sm text-center mt-2">Masculino</p>
                </div>
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <Link href={'/search?query=feminino'}>
                            <IoFemale size={20} />
                        </Link>
                    </div>
                    <p className="text-text text-sm text-center mt-2">Feminino</p>
                </div>
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <Link href={'/search?query=infantil'}>
                            <IoDiceOutline size={20} />
                        </Link>
                    </div>
                    <p className="text-text text-sm text-center mt-2">Infantil</p>
                </div>
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <Link href={'/search?query=infantil'}>
                            <FaBaby size={20} />
                        </Link>
                    </div>
                    <p className="text-text text-sm text-center mt-2">Bebê</p>
                </div>
            </div>
        </div>
    )
}

