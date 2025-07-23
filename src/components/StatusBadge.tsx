import clsx from 'clsx';

interface StatusBadgeProps {
    status: string;
}

const statusConfig = {
    pending: {
        label: 'Pendente',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    },
    approved: {
        label: 'Aprovada',
        className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    },
    rejected: {
        label: 'Rejeitada',
        className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    }
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
    const normalizedStatus = status?.toLowerCase().trim();
    const config = statusConfig[normalizedStatus as keyof typeof statusConfig];
    
    return (
        <span
            className={clsx(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                config?.className || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            )}
        >
            {config?.label || status || 'Desconhecido'}
        </span>
    );
}
