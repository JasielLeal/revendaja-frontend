"use client"

import { createContext, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { backend } from "../api/backend";
import { redirect } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface AuthContextData {
    signed: boolean;
    user: {
        id: string;
        name: string;
        secondName: string;
        email: string;
        image: string;
        paymentStatus: string;
        role: string;
        userHasStore: boolean
    } | null;
    signInFc(data: FieldValues): Promise<void>; // Corrigido aqui
    logoutFc(): Promise<void>;
    updateUserStoreStatus(hasStore: boolean): Promise<void>;
    loading: boolean;
}

interface User {
    id: string;
    name: string;
    secondName: string;
    email: string;
    image: string;
    paymentStatus: string;
    role: string;
    userHasStore: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            try {
                const cookie = new Cookies();
                const storagedToken = await cookie.get("token");
                const storagedUser = await cookie.get("user");

                if (storagedToken && storagedUser) {
                    setUser(storagedUser);

                    const decodedToken = jwtDecode(storagedToken);
                    const currentDate = new Date();
                    const expirationDate = new Date(Number(decodedToken?.exp) * 1000);
                    if (expirationDate < currentDate) {
                        logoutFc();
                    }
                }

            } catch (error) {
                redirect("/login");
                console.error("Erro ao carregar os dados do armazenamento:", error);
            } finally {
                setLoading(false);
            }
        }

        loadStoragedData();
    }, [user]);

    interface singInProps {
        email: string;
        password: string;
    }

    // Função corrigida para signInFc
    async function signInFc(dataValue: singInProps) {
        try {
            const response = await backend.post("/user/session", {
                email: dataValue.email,
                password: dataValue.password,
            });

            const { data } = response;
            setUser(data.user);
            const cookie = new Cookies();
            const expiryTime = new Date();
            expiryTime.setTime(expiryTime.getTime() + 8 * 60 * 60 * 1000); // 8 horas
            cookie.set("token", data.token, { expires: expiryTime });
            cookie.set("user", data.user);

            return data.user
        } catch (e) {
            console.log(e);
            console.log(JSON.stringify(e, null, 4));
            console.log(
                "Erro no Login",
                "Não foi possível realizar o login. Por favor, verifique suas credenciais e tente novamente."
            );
            setLoading(false);
        }
    }

    async function logoutFc() {
        const cookie = new Cookies();
        cookie.remove("token");
        setUser(null);

    }

    async function updateUserStoreStatus(hasStore: boolean) {
        setUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    userHasStore: hasStore,
                };
            }
            return prevUser;
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signInFc, loading, logoutFc, updateUserStoreStatus }}>
            {loading ?
                // Spinner de carregamento
                <div className="flex justify-center items-center h-screen">
                    <ClipLoader color="#4A90E2" loading={loading} size={50} />
                </div>
                :
                children
            }
        </AuthContext.Provider>
    );
}

export default AuthContext;
