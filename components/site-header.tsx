"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function SiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Ignora o primeiro segmento ("dashboard" como "Início")
  const breadcrumbSegments = segments.slice(0);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <header className="flex tracking-tighter h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <Breadcrumb>
          {breadcrumbSegments.map((segment, index) => {
            const path = "/" + segments.slice(0, index + 1).join("/");
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={path} className="font-medium">{capitalize(segment.replace(/-/g, " "))}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
    </header>
  );
}
