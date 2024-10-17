import logo from "@/assets/Logo - Completa.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schemas/LoginSchema";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    const { signInFc, user } = useContext(AuthContext)

    async function onSub(data: FieldValues) {
        try {
            await signInFc(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="grid grid-cols-9">
            <div className="col-span-5"></div>
            <div className="col-span-4 flex flex-col h-screen px-40 justify-center">
                <img alt="logo do site" src={logo} className="w-40 mb-16" />
                <p className="font-semibold text-2xl mb-5">Bem-vindo de volta, {user?.name}</p>

                <form onSubmit={handleSubmit(onSub)}>
                    <div className="mb-5">
                        <p className="font-medium mb-1">E-mail</p>
                        <Input
                            placeholder="Digite seu E-mail"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
                    </div>

                    <div className="mb-5">
                        <p className="font-medium mb-1">Senha</p>
                        <Input
                            type="password" // Campo de senha
                            placeholder="Digite sua senha"
                            {...register('password')}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
                    </div>

                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Switch id="airplane-mode" />
                            <p className="font-medium">Continuar logado</p>
                        </div>
                        <a href="/forgetpassword" className="font-medium text-primary">Esqueceu a senha?</a>
                    </div>

                    <Button type="submit" className="w-full">
                        Entrar
                    </Button>
                </form>

                <Separator className="my-10" />

                <div className="flex items-center justify-center gap-2">
                    <p>Não tem uma conta?</p>
                    <a href={'/'} className="font-semibold text-primary">Crie gratuitamente</a>
                </div>
            </div>
        </div>
    );
}
