import { useDomain } from "@/app/context/DomainContext";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { IoChevronForwardOutline, IoMenu, IoPricetags, IoColorPalette, IoBag, IoMale, IoFemale, IoLeaf } from "react-icons/io5";

export function MobileNavBar() {

    const { storeData } = useDomain()

    const categorys = [
        { id: 1, name: 'Promoções', link: '/promotions', icone: IoPricetags },
        { id: 2, name: 'Personalizados', link: '/search?query=personalizado', icone: IoColorPalette },
        { id: 3, name: 'Kits', link: '/search?query=kits', icone: IoBag },
        { id: 4, name: 'Masculino', link: '/search?query=masculino', icone: IoMale },
        { id: 5, name: 'Feminino', link: '/search?query=feminino', icone: IoFemale },
        { id: 6, name: 'Perfumes', link: '/search?query=perfume', icone: IoLeaf }
    ]

    return (
        <>
            <Sheet >
                <SheetTrigger asChild >
                    <div className="text-2xl text-white">
                        <IoMenu />
                    </div>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle className="flex items-start justify-start text-text font-medium mb-10">
                            <p>{storeData?.name}</p>
                        </SheetTitle>
                    </SheetHeader>
                    {categorys?.map((category, index) => (
                        <Link href={category.link} className={`flex items-center justify-between mt-5 pb-3 ${index === categorys.length - 1 ? '' : 'border-b'
                            }`} key={category.id}>
                            <div className="flex items-start gap-2">

                                <p className="text-primary">
                                    <category.icone size={20} />
                                </p>
                                <p className="text-text font-medium">
                                    {category.name}
                                </p>

                            </div>
                            <IoChevronForwardOutline />
                        </Link>
                    ))}
                </SheetContent>
            </Sheet>

        </>
    )
}