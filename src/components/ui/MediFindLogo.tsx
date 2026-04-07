
import type { SVGProps } from "react"

export default function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 240"
            role="img"
            aria-label="MediFind logo"
            {...props}
        >
            <g transform="translate(0,0)">
                <circle cx="120" cy="120" r="104" fill="#2b9ad5" opacity="0.35" />
                <circle cx="120" cy="120" r="92" fill="#BDEBF0" opacity="0.95" />

                <rect x="108" y="32" width="24" height="176" rx="12" fill="#2b9ad5" opacity="0.8" />
                <rect x="32" y="108" width="176" height="24" rx="12" fill="#2b9ad5" opacity="0.8" />

                <circle cx="120" cy="120" r="36" fill="#2b9ad5" opacity="0.6" />
                <circle cx="120" cy="120" r="26" fill="#1e92cd" opacity="0.9" />

                <circle cx="78" cy="86" r="7" fill="#2b9ad5" />
                <circle cx="162" cy="86" r="7" fill="#2b9ad5" />
                <circle cx="78" cy="154" r="7" fill="#2b9ad5" />
                <circle cx="162" cy="154" r="7" fill="#2b9ad5" />
            </g>

            <text x="260" y="175"
                fontFamily="sans-serif"
                fontSize="160"
                fontWeight="600"
                letterSpacing="-2">
                <tspan fill="#2b9ad5">Medi</tspan><tspan fill="#111111">Find</tspan>
            </text>
        </svg>
    )
}
