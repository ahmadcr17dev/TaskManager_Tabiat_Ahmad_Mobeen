// StatsBar — shows task counts by status
const StatsBar = ({ stats }) => {

    // Stat card config
    const cards = [
        {
            label: 'Total Tasks',
            value: stats.total,
            bg: 'bg-white',
            text: 'text-slate-800',
            sub: 'text-slate-400',
            border: 'border-slate-200',
        },
        {
            label: 'To Do',
            value: stats.todo,
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            sub: 'text-blue-400',
            border: 'border-blue-100',
        },
        {
            label: 'In Progress',
            value: stats.inProgress,
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            sub: 'text-amber-400',
            border: 'border-amber-100',
        },
        {
            label: 'Done',
            value: stats.done,
            bg: 'bg-green-50',
            text: 'text-green-700',
            sub: 'text-green-400',
            border: 'border-green-100',
        },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`${card.bg} border ${card.border} rounded-xl px-4 py-4 shadow-sm`}
                >
                    <p className={`text-3xl font-bold ${card.text}`}>
                        {card.value}
                    </p>
                    <p className={`text-xs font-medium mt-1 ${card.sub}`}>
                        {card.label}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default StatsBar;