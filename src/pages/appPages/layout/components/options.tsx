import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaAngleDown } from "react-icons/fa6"
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { Button } from "@/components/ui/button";

export function Options() {

    const { user, logoutFc } = useContext(AuthContext);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='flex gap-2'>
                        <div>
                            <p className='font-semibold'>{user?.name} {user?.secondName}</p>
                            <p className='text-xs text-start'>{user?.role}</p>
                        </div>
                        <div className='mt-[1px]'>
                            <FaAngleDown />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Configurações</DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button variant={'ghost'} className="w-full text-start" onClick={()=> logoutFc()}>
                            Sair
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}