import { useState } from 'react';
import { FaLongArrowAltDown, FaLongArrowAltRight, FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

// Priority styles config
const priorityStyles = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-600',
}

// Priority labels
const priorityLabels = {
    low: <span className="flex items-center gap-1"><FaLongArrowAltDown /> Low</span>,
    medium: <span className="flex items-center gap-1"><FaLongArrowAltRight /> Medium</span>,
    high: <span className="flex items-center gap-1"><FaLongArrowAltUp /> High</span>,
}

// Status styles config
const statusStyles = {
    todo: 'bg-blue-50 text-blue-600',
    'in-progress': 'bg-amber-50 text-amber-600',
    done: 'bg-green-50 text-green-600',
}

// TaskCard — single task with inline status update and delete
const TaskCard = ({ task, onUpdate, onDelete }) => {

    // Track loading state for status update
    const [updating, setUpdating] = useState(false)

    // Handle inline status dropdown change
    const handleStatusChange = async (e) => {
        const newStatus = e.target.value
        if (newStatus === task.status) return
        setUpdating(true)
        try {
            await onUpdate(task._id, { status: newStatus })
        } finally {
            setUpdating(false)
        }
    }

    // Format createdAt date
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className={`bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 flex flex-col gap-3 ${task.status === 'done' ? 'opacity-60' : ''
            }`}>

            {/* ── Top row: title + delete ── */}
            <div className="flex items-start justify-between gap-2">
                <h3 className={`text-sm font-semibold text-slate-800 leading-snug ${task.status === 'done' ? 'line-through text-slate-400' : ''
                    }`}>
                    {task.title}
                </h3>

                {/* Delete button */}
                <button
                    onClick={() => onDelete(task._id)}
                    title="Delete task"
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg p-1 flex-shrink-0 text-base leading-none"
                >
                    <MdOutlineCancel />
                </button>
            </div>

            {/* ── Description ── */}
            {task.description && (
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* ── Divider ── */}
            <div className="border-t border-slate-100" />

            {/* ── Bottom row: priority + date + status ── */}
            <div className="flex items-center justify-between gap-2 flex-wrap">

                {/* Left: priority badge + date */}
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityStyles[task.priority]}`}>
                        {priorityLabels[task.priority]}
                    </span>
                    <span className="text-xs text-slate-400">
                        {formatDate(task.createdAt)}
                    </span>
                </div>

                {/* Right: inline status dropdown */}
                {updating ? (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        Saving...
                    </div>
                ) : (
                    <select
                        value={task.status}
                        onChange={handleStatusChange}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${statusStyles[task.status]}`}
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                )}
            </div>
        </div>
    )
}

export default TaskCard;