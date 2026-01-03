import type React from "react";

type LogoProps = React.SVGProps<SVGSVGElement>;

export function NaturaLogo(props: LogoProps) {
    return (
        <svg viewBox="0 0 160 40" role="img" aria-label="Natura" {...props}>
            <title>Natura</title>
            <g fill="currentColor">
                <circle cx="20" cy="14" r="6" fillOpacity="0.2" />
                <circle cx="32" cy="10" r="5" fillOpacity="0.2" />
                <circle cx="26" cy="22" r="7" fillOpacity="0.14" />
                <text x="54" y="26" fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system" fontSize="24" fontWeight="700" letterSpacing="0.5">
                    natura
                </text>
            </g>
        </svg>
    );
}

export function OBoticarioLogo(props: LogoProps) {
    return (
        <svg viewBox="0 0 180 40" role="img" aria-label="O Boticário" {...props}>
            <title>O Boticário</title>
            <g fill="currentColor">
                <rect x="10" y="10" width="18" height="18" rx="9" fillOpacity="0.18" />
                <text x="40" y="26" fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system" fontSize="22" fontWeight="700" letterSpacing="0.4">
                    O Boticário
                </text>
            </g>
        </svg>
    );
}

export function QDBLogo(props: LogoProps) {
    return (
        <svg viewBox="0 0 210 40" role="img" aria-label="quem disse, berenice?" {...props}>
            <title>quem disse, berenice?</title>
            <g fill="currentColor">
                <path d="M18 12c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" fillOpacity="0.18" />
                <text x="36" y="26" fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system" fontSize="18" fontWeight="700">
                    quem disse, berenice?
                </text>
            </g>
        </svg>
    );
}

export function AvonLogo(props: LogoProps) {
    return (
        <svg viewBox="0 0 140 40" role="img" aria-label="Avon" {...props}>
            <title>Avon</title>
            <g fill="currentColor">
                <polygon points="14,28 22,12 30,28" fillOpacity="0.18" />
                <text x="44" y="26" fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system" fontSize="24" fontWeight="700" letterSpacing="1">
                    AVON
                </text>
            </g>
        </svg>
    );
}

export function EudoraLogo(props: LogoProps) {
    return (
        <svg viewBox="0 0 160 40" role="img" aria-label="Eudora" {...props}>
            <title>Eudora</title>
            <g fill="currentColor">
                <rect x="12" y="10" width="16" height="20" rx="4" fillOpacity="0.16" />
                <text x="40" y="26" fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system" fontSize="22" fontWeight="700" letterSpacing="0.6">
                    eudora
                </text>
            </g>
        </svg>
    );
}
