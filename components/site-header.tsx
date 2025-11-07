"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Mapeamento de rotas para nomes amigáveis
const routeNames: Record<string, string> = {
  "dashboard": "Dashboard",
  "stock": "Estoque",
  "new-product": "Adicionar Novo Produto",
  "sales": "Vendas",
  "products": "Produtos",
  "customers": "Clientes",
  "orders": "Pedidos",
  "reports": "Relatórios",
  "settings": "Configurações",
};

export function SiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbSegments = segments.slice(0);

  const getRouteName = (segment: string) => {
    return routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
  };

  return (
    <header className="flex tracking-tighter h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbSegments.map((segment, index) => {
              const path = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === breadcrumbSegments.length - 1;

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{getRouteName(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={path}>{getRouteName(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
