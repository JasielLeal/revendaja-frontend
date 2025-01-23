import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""; // Obtem o host atual
  const mainDomain = process.env.NEXT_PUBLIC_FRONTEND || "revendaja.vercel.app"; // Domínio principal

  if (host !== mainDomain) {
    const subdomain = host.split(".")[0]; // Pega o subdomínio
    request.nextUrl.searchParams.set("subdomain", subdomain); // Adiciona o subdomínio aos parâmetros
  }

  return NextResponse.next(); // Continua o fluxo
}
