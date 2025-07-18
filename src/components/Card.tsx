import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 p-5 rounded shadow">{children}</div>
    )
}