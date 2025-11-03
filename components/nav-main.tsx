"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel>Início</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url

            return (
              <SidebarMenuItem key={item.title}>
                {/* 🔗 Usa o Link do Next para navegar */}
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex w-full items-center cursor-pointer gap-2 rounded-md px-3 py-2 transition-all duration-200
                      ${isActive
                        ? "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary"
                        : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/40"
                      }`}
                  >
                    {item.icon && (
                      <item.icon
                        className={`size-4 transition-colors ${isActive ? "text-primary" : "dark:text-muted-foreground"
                          }`}
                      />
                    )}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
