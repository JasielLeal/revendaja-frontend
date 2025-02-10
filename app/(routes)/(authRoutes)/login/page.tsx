'use client'

import Image from "next/image";
import logo from "@/app/assets/logo.png"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldValues, useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "@/app/context/AuthContext";
import { LoginSchema } from "./schemas/SalePendingSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Login() {

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    const { signInFc, logoutFc } = useContext(AuthContext)
    const route = useRouter()

    const { mutateAsync: signIn } = useMutation({
        mutationFn: signInFc,
        onSuccess: (response) => {
            console.log(response)
            if (response.role !== 'Owner') { // Agora o TypeScript reconhece 'role'
                logoutFc()
            }
            route.push('/home')
        },
        onError: () => { }
    });


    async function onSub(data: FieldValues) {
        await signIn(data)
    }

    return (
        <div className="flex items-center justify-center flex-col w-full h-screen bg-[#09090b]">
            <div className="px-5 w-[400px]">
                <div className="flex items-center justify-center w-full">
                    <Image src={logo} alt="logo" width={150} height={150} />
                </div>
                <p className="text-gray-300 text-center  mb-5">Painel administrativo</p>
                <form onSubmit={handleSubmit(onSub)}>
                    <div className="my-5">
                        <Input placeholder="E-mail" {...register('email')} className="bg-[#27272a]" />

                    </div>

                    <div className="flex justify-end w-full mb-2">
                        <Link href="/register" className="text-primary font-medium text-sm">Esqueceu a senha?</Link>
                    </div>

                    <div>
                        <Input placeholder="Senha" {...register('password')} className="bg-[#27272a]" />

                    </div>

                    <div className="w-full mt-5">
                        <Button className="w-full hover:bg-secondary" variant={'default'}>Entrar</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}