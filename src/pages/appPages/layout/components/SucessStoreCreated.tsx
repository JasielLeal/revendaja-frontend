import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { IoCheckmarkSharp } from "react-icons/io5";

interface SuccessStoreCreatedProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SucessStoreCreated({ isOpen, onOpenChange }: SuccessStoreCreatedProps) {
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange} >
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {/* Container do ícone de check estilizado como redondo */}
                            <div className="bg-green-400 text-white text-center p-4 flex items-center justify-center rounded-full w-12 h-12 mx-auto mt-2">
                                <IoCheckmarkSharp className="text-xl" />
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            <p className="text-center mt-5 font-bold text-lg">Sucesso</p>
                            <p className="text-center text-gray-600 mt-2">
                                A loja foi criada com sucesso! Agora você pode começar a adicionar seus produtos e começar online.
                            </p>
                            <DialogClose asChild>
                                <Button className="w-full mt-5">Voltar ao Dashboard</Button>
                            </DialogClose>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
