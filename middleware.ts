import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  const isLocalhost = host.includes("localhost");

  let subdomain = "";

  if (isLocalhost) {
    const parts = host.split(".");
    // Exemplo: lealperfumaria.localhost:3000 -> ["lealperfumaria", "localhost:3000"]
    subdomain = parts.length >= 2 ? parts[0] : "localhost";
  } else {
    subdomain = host.split(".")[0]; // Em produção: subdominio.dominio.com
  }

  const isPreview = host.includes("-") && host.endsWith(".vercel.app");

  if (isPreview) return NextResponse.next();

  const baseDomain = process.env.NEXT_PUBLIC_HOST;

  if (host === baseDomain || subdomain === "localhost" || subdomain === "www") {
    return NextResponse.next();
  }

  // Ignora assets e API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Reescreve para /store (respeitando suas pastas dentro do App Router)
  const rewriteUrl = new URL(`/store${url.pathname}`, request.url);

  const response = NextResponse.rewrite(rewriteUrl);
  response.headers.set("x-debug-subdomain", subdomain);
  response.headers.set("x-debug-host", host);

  return response;
}

// 👇 Adicione isso no final para garantir que o middleware rode em tudo
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
