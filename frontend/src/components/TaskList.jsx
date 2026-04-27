import TaskCard from './TaskCard'

// TaskList — responsive grid of task cards
const TaskList = ({ tasks, onUpdate, onDelete }) => {
    return (
        <div>
            {/* Results count */}
            <p className="text-xs text-slate-400 mb-3 font-medium">
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
            </p>

            {/* Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default TaskList;