import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import FilterBar from './components/FilterBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({ status: '', priority: '' })
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [filters])

  const apiFetch = async (endpoint, options = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...options.headers,
      },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Something went wrong')
    return data
  }

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.priority) params.append('priority', filters.priority)
      const data = await apiFetch(`/tasks?${params.toString()}`)

      // Debug — see exact response
      console.log('Full response:', data)
      console.log('data.data:', data.data)
      console.log('Is array:', Array.isArray(data.data))

      // Safely set tasks
      if (Array.isArray(data.data)) {
        setTasks(data.data)
      } else if (Array.isArray(data)) {
        setTasks(data)
      } else {
        setTasks([])
      }
    } catch (err) {
      console.error('Fetch error:', err)
      toast.error('Failed to fetch tasks')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (taskData) => {
    try {
      await apiFetch('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      })
      toast.success('Task created!')
      setShowForm(false)
      fetchTasks()
    } catch (err) {
      toast.error(err.message || 'Failed to create task')
    }
  }

  const handleUpdate = async (id, updates) => {
    try {
      await apiFetch(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
      toast.success('Task updated!')
      fetchTasks()
    } catch (err) {
      toast.error(err.message || 'Failed to update task')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await apiFetch(`/tasks/${id}`, { method: 'DELETE' })
      toast.success('Task deleted!')
      fetchTasks()
    } catch (err) {
      toast.error(err.message || 'Failed to delete task')
    }
  }

  // Always treat tasks as array to avoid filter errors
  const safeTasks = Array.isArray(tasks) ? tasks : []

  const stats = {
    total: safeTasks.length,
    todo: safeTasks.filter(t => t.status === 'todo').length,
    inProgress: safeTasks.filter(t => t.status === 'in-progress').length,
    done: safeTasks.filter(t => t.status === 'done').length,
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Toaster lives here — simple and clean */}
      <Toaster />

      <Header showForm={showForm} onToggleForm={() => setShowForm(!showForm)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        <StatsBar stats={stats} />

        {showForm && (
          <TaskForm onCreate={handleCreate} onCancel={() => setShowForm(false)} />
        )}

        <FilterBar filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : safeTasks.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-slate-600 font-medium text-lg">No tasks found</p>
            <p className="text-slate-400 text-sm mt-1">Create a new task or clear your filters</p>
          </div>
        ) : (
          <TaskList tasks={safeTasks} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
      </main>
    </div>
  )
}

export default App;