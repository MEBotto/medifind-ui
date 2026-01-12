import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const dateToYMD = (val: unknown): string | undefined => {
    if (!val) return undefined;
    const date = typeof val === "string" ? new Date(val) : val;
    if (!(date instanceof Date) || isNaN(date.getTime())) return undefined;
    return date.toISOString().split("T")[0];
};

export const formatDateDMY = (val: unknown): string | undefined => {
    if (!val) return undefined;

    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
        const [y, m, d] = val.split("-");
        return `${d}/${m}/${y}`;
    }

    const date = typeof val === "string" ? new Date(val) : val;
    if (!(date instanceof Date) || isNaN(date.getTime())) return undefined;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};