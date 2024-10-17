import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {

    const { pathname } = useLocation()

    return (
        <>
            <Link
                data-current={pathname === props.to}
                {...props}
                className="flex items-center gap-2 py-2 px-5 rounded-lg data-[current=true]:bg-primary data-[current=true]:text-foreground hover:bg-secondary font-medium"
            />
        </>
    )
}