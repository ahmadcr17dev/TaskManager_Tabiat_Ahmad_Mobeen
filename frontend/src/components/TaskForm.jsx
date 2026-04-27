import { useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { GiHazardSign } from "react-icons/gi";

// TaskForm — create a new task with client side validation
const TaskForm = ({ onCreate, onCancel }) => {

    // Form field values
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
    })

    // Validation error messages
    const [errors, setErrors] = useState({})

    // Loading while submitting
    const [submitting, setSubmitting] = useState(false)

    // Update field and clear its error
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Client side validation rules
    const validate = () => {
        const errs = {}
        if (!formData.title.trim()) {
            errs.title = 'Title is required'
        } else if (formData.title.trim().length < 3) {
            errs.title = 'Title must be at least 3 characters'
        } else if (formData.title.trim().length > 100) {
            errs.title = 'Title cannot exceed 100 characters'
        }
        if (formData.description.length > 500) {
            errs.description = 'Description cannot exceed 500 characters'
        }
        return errs
    }

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        setSubmitting(true)
        try {
            await onCreate(formData)
            // Reset form on success
            setFormData({ title: '', description: '', status: 'todo', priority: 'medium' })
            setErrors({})
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            {/* Form header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-slate-800">
                    Create New Task
                </h2>
                <span className="text-xs text-slate-400">
                    Fields marked <span className="text-red-500">*</span> are required
                </span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="What needs to be done?"
                            className={`w-full text-sm rounded-lg px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title
                                ? 'border-red-400 bg-red-50'
                                : 'border-slate-200 bg-slate-50'
                                }`}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                <GiHazardSign /> {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Description
                            <span className="text-slate-400 font-normal ml-1">(optional)</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add more details about this task..."
                            rows={3}
                            className={`w-full text-sm rounded-lg px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description
                                ? 'border-red-400 bg-red-50'
                                : 'border-slate-200 bg-slate-50'
                                }`}
                        />
                        {/* Character counter */}
                        <div className="flex items-center justify-between mt-1">
                            {errors.description
                                ? <p className="text-red-500 text-xs"><GiHazardSign /> {errors.description}</p>
                                : <span />
                            }
                            <p className={`text-xs ml-auto ${formData.description.length > 450
                                ? 'text-red-500'
                                : 'text-slate-400'
                                }`}>
                                {formData.description.length}/500
                            </p>
                        </div>
                    </div>

                    {/* Status + Priority side by side */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-sm text-slate-600 hover:text-slate-800 font-medium px-4 py-2.5 rounded-lg hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Task'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;