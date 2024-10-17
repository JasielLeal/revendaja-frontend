import logo from "@/assets/Logo - Completa.png"
import { NavLink } from "./components/navLink"
import { IoBagCheckOutline, IoBarChartOutline, IoCartOutline, IoDocumentLockOutline, IoFlagOutline, IoPricetagOutline, IoReceiptOutline, IoSpeedometerOutline, IoWalletOutline } from "react-icons/io5";
import { Options } from "./components/options";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { getInitials } from "@/utils/GetInitials";
import { Outlet } from "react-router-dom";

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
                        <NavLink to={'/'}><IoSpeedometerOutline /> Dashboard</NavLink>
                        <NavLink to={'/e'}><IoFlagOutline /> Metas</NavLink>
                    </div>
                </div>
                <div>
                    <p className="font-medium text-gray-500 pt-7">Financeiro</p>
                    <div className="flex flex-col gap-2">
                        <NavLink to={'/e'}><IoReceiptOutline /> Boletos</NavLink>
                        <NavLink to={'/e'}><IoCartOutline /> Vendas</NavLink>
                        <NavLink to={'/e'}><IoWalletOutline /> Despesas</NavLink>
                    </div>
                </div>
                <div>
                    <p className="font-medium text-gray-500 pt-7">Minha Loja</p>
                    <div className="flex flex-col gap-2">
                        <NavLink to={'/e'}><IoBarChartOutline /> Relatórios</NavLink>
                        <NavLink to={'/e'}><IoBagCheckOutline /> Estoque</NavLink>
                        <NavLink to={'/e'}><IoDocumentLockOutline /> Dividas Abertas</NavLink>
                        <NavLink to={'/e'}><IoPricetagOutline /> Promoções</NavLink>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex gap-3 items-center justify-end border-b h-[70px] p-4 bg-white dark:bg-background relative z-10 w-full">
                    <Avatar>
                        <AvatarImage src={user?.image} className='object-cover' />
                        <AvatarFallback>{getInitials(user?.name as string, user?.secondName as string)}</AvatarFallback>
                    </Avatar>
                    <Options />
                </div>
                <div className="pt-5 pl-5">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}