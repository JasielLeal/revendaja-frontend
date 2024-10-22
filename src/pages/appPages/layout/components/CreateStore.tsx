import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query";
import { CreateStoreFn } from "../services/CreateStore"
import { FieldValues, useForm } from "react-hook-form"
import { CreateStoreSchema } from "../schemas/CreateStoreSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import AuthContext from "@/context/AuthContext"

export function CreateStore() {


    const { user, updateUserStoreStatus } = useContext(AuthContext)

    const { mutateAsync: createStoreFn } = useMutation({
        mutationFn: CreateStoreFn,
        onSuccess: () => {
            updateUserStoreStatus(true);
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(CreateStoreSchema),
        mode: 'all',
        criteriaMode: 'all',
    })

    async function onSub(data: FieldValues) {
        const storeData = {
            ...data, // Dados do formulário
            userId: user?.id, // Adiciona o userId
        };

        await createStoreFn(storeData)
        console.log(data)
    }


    return (
        <>
            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <Button>Criar Minha Loja</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold uppercase">Crie Sua Loja</DialogTitle>
                        <DialogDescription>
                            Complete as informações abaixo para criar sua loja.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSub)}>
                        <p>Nome da loja</p>
                        <Input className="mb-5" {...register('name')} />
                        <p>Descriação</p>
                        <Input {...register('description')} />
                        <div className="flex items-center space-x-2 my-5">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">Aceito os <a href="/" className="text-primary">Termos e Condições </a>
                                do Revendaja.
                            </Label>
                        </div>
                        <div className="w-full flex gap-2 mt-5">
                            <Button className="w-full">
                                Criar
                            </Button>
                            <Button variant={'link'} className="w-full">Cancelar</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    )
}