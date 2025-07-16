import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className="bg-white p-5 rounded shadow">{children}</div>
    )
}