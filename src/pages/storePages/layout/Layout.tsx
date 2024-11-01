import { Outlet } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { IoCart, IoReorderThree } from "react-icons/io5";
import { useDomain } from "@/context/DomainContext";
import InputWithIcon from "./components/InputWithIcon";
import { Footer } from "./components/Footer";

export function Layout() {

    const { storeData } = useDomain();

    return (
        <>
            <div className="flex items-center justify-between px-2 mt-3">
                <Sheet>
                    <SheetTrigger asChild >
                        <Button variant={'ghost'} size={'icon'}>
                            <IoReorderThree />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <div className="font-bold text-xl">
                    <a href="/">{storeData?.name}</a>
                </div>

                <div>
                    <Button size={'icon'} variant={'ghost'}>
                        <IoCart />
                    </Button>
                </div>
            </div>
            <div className="px-5 my-5">
                <InputWithIcon />
            </div>
            <div className="px-5">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}