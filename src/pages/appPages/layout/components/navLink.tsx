import { Link, LinkProps, useLocation } from "react-router-dom";
import React from "react";

export type NavLinkProps = LinkProps & {
    isEnabled: boolean; // Propriedade para controle de habilitação
    disabledRoutes?: string[]; // Rotas em que o link deve estar desabilitado
}

export function NavLink({ isEnabled, disabledRoutes = [], ...props }: NavLinkProps) {
    const { pathname } = useLocation();

    // Verifica se a rota atual está na lista de rotas desabilitadas
    const isDisabledRoute = disabledRoutes.includes(pathname);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!isEnabled || isDisabledRoute) {
            event.preventDefault(); // Impede a navegação se o link estiver desabilitado
        }
    };

    return (
        <Link
            data-current={pathname === props.to}
            {...props}
            onClick={handleClick}
            className={`flex items-center gap-2 py-2 px-5 rounded-lg data-[current=true]:bg-primary data-[current=true]:text-foreground data-[current=true]:text-white ${isEnabled && !isDisabledRoute ? "hover:bg-secondary" : "cursor-not-allowed opacity-50"
                } font-medium`} // Muda o estilo quando desabilitado
            aria-disabled={!isEnabled || isDisabledRoute} // Acessibilidade para indicar que o link está desabilitado
        >
            {props.children}
        </Link>
    );
}
