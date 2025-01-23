import Image from "next/image";
import Link from "next/link";
import logo from '@/app/assets/LogoCompletaBlack.png'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoMenu } from "react-icons/io5";

export function MobileNavBar() {
    return (
        <>
            
                <div className="flex justify-between px-4 pt-10">
                    <Link href={'/'}>
                        <Image alt="logo do site" src={logo} width={100} height={100} />
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <IoMenu className="text-[#0A2540]" size={25} />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
           
        </>
    );
}