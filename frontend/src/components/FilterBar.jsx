// FilterBar — filter tasks by status and/or priority instantly
const FilterBar = ({ filters, setFilters }) => {

    // Update a single filter field
    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    // Reset all filters
    const clearFilters = () => setFilters({ status: '', priority: '' })

    // Check if any filter is active
    const isFiltering = filters.status || filters.priority

    return (
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">

                {/* Label */}
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Filter
                </span>

                {/* Status dropdown */}
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="text-sm border border-slate-200 bg-slate-50 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                {/* Priority dropdown */}
                <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleChange}
                    className="text-sm border border-slate-200 bg-slate-50 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                {/* Clear button — only when filtering */}
                {isFiltering && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-2 rounded-lg hover:bg-red-50"
                    >
                        Clear filters
                    </button>
                )}

                {/* Active filter badge */}
                {isFiltering && (
                    <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2.5 py-1 rounded-full">
                        {[filters.status, filters.priority].filter(Boolean).length} active
                    </span>
                )}
            </div>
        </div>
    )
}

export default FilterBar;