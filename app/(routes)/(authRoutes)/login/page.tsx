'use client'

import Image from "next/image";
import logo from "@/app/assets/logo.png"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schemas/LoginSchema";
import { FieldValues, useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "@/app/context/AuthContext";

export default function Login() {

    const { register, handleSubmit} = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    const { signInFc } = useContext(AuthContext)

    async function onSub(data: FieldValues) {
        try {
            signInFc(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex items-center justify-center flex-col w-full h-screen">
            <div className="w-full px-5">
                <div className="flex items-center justify-center w-full mb-5">
                    <Image src={logo} alt="logo" width={150} height={150} />
                </div>

                <form onSubmit={handleSubmit(onSub)}>
                    <div className="my-5">
                        <Input placeholder="E-mail" {...register('email')} />
                       
                    </div>

                    <div className="flex justify-end w-full mb-2">
                        <Link href="/register" className="text-primary font-medium text-sm">Esqueceu a senha?</Link>
                    </div>
                    
                    <div>
                        <Input placeholder="Senha" {...register('password')} />
                        
                    </div>

                    <div className="w-full mt-5">
                        <Button className="w-full hover:bg-secondary" variant={'default'}>Entrar</Button>
                    </div>
                </form>

                <div className="flex flex-row items-center justify-center gap-1 mt-5">
                    <p>
                        Não tem uma conta?
                    </p>
                    <Link href="/register" className="text-primary font-medium">Criar conta</Link>
                </div>
            </div>

        </div>
    )
}