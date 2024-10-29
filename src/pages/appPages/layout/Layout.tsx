import logo from "@/assets/Logo - Completa.png"
import { NavLink } from "./components/navLink"
import { IoBagCheckOutline, IoBarChartOutline, IoCartOutline, IoDocumentLockOutline, IoFlagOutline, IoPricetagOutline, IoReceiptOutline, IoSpeedometerOutline, IoWalletOutline } from "react-icons/io5";
import { Options } from "./components/options";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { getInitials } from "@/utils/GetInitials";
import { Outlet } from "react-router-dom";
import { CreateStore } from "./components/CreateStore";

export function Layout() {

    const { user } = useContext(AuthContext);

    return (
        <div className="flex">
            <div className="w-72 p-7 border-r h-screen">
                <div>
                    <img alt="logo do site" src={logo} className="w-40 mb-16" />
                </div>
                <div>
                    <p className="font-medium text-gray-500 mb-3">Geral</p>
                    <div className="flex flex-col gap-2">
                        <NavLink to={'/'} isEnabled={true}><IoSpeedometerOutline /> Dashboard</NavLink>
                        <NavLink to={'/e'} isEnabled={true}><IoFlagOutline /> Metas</NavLink>
                    </div>
                </div>
                <div>
                    <p className="font-medium text-gray-500 pt-7 mb-3">Financeiro</p>
                    <div className="flex flex-col gap-2">
                        <NavLink to={'/e'} isEnabled={true}><IoReceiptOutline /> Boletos</NavLink>
                        <NavLink to={'/e'} isEnabled={true}><IoCartOutline /> Vendas</NavLink>
                        <NavLink to={'/e'} isEnabled={true} ><IoDocumentLockOutline /> Dividas Abertas</NavLink>
                        <NavLink to={'/e'} isEnabled={true}><IoWalletOutline /> Despesas</NavLink>
                    </div>
                </div>
                {
                    user?.userHasStore ?

                        <div>
                            <p className="font-medium text-gray-500 pt-7 mb-3">Minha Loja</p>
                            <div className="flex flex-col gap-2">
                                <NavLink to={'/relatorio'} isEnabled={true}><IoBarChartOutline /> Relatórios</NavLink>
                                <NavLink to={'/estoque'} isEnabled={true}><IoBagCheckOutline /> Estoque</NavLink>
                                <NavLink to={'/e'} isEnabled={true}><IoPricetagOutline /> Promoções</NavLink>
                            </div>
                        </div>


                        :
                        <>
                            <p className="font-medium text-gray-500 pt-7 mb-3">Minha Loja</p>
                            <CreateStore />
                        </>

                }
            </div>
            <div className="w-full">
                <div className="flex gap-3 items-center justify-end border-b h-[70px] p-4 bg-white dark:bg-background relative z-10 w-full">
                    <Avatar>
                        <AvatarImage src={user?.image} className='object-cover' />
                        <AvatarFallback>{getInitials(user?.name as string, user?.secondName as string)}</AvatarFallback>
                    </Avatar>
                    <Options />

                </div>
                <div className="pt-5 px-5">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}