import { IoDiceOutline, IoFemale, IoMaleOutline } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";

export function Categories() {
    return (
        <div className="bg-[#F1F1F1] px-3 pt-5">
            <div className="flex items-center justify-between">
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <IoMaleOutline size={20} />
                    </div>
                    <p className="text-text text-sm text-center mt-2">Masculino</p>
                </div>
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <IoFemale size={20} />
                    </div>
                    <p className="text-text text-sm text-center mt-2">Feminina</p>
                </div>
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <IoDiceOutline size={20} />
                    </div>
                    <p className="text-text text-sm text-center mt-2">Infantil</p>
                </div>
                <div>
                    <div className="bg-white rounded-full flex justify-center p-6 text-primary">
                        <FaBaby size={20}/>
                    </div>
                    <p className="text-text text-sm text-center mt-2">Bebê</p>
                </div>
            </div>
        </div>
    )
}