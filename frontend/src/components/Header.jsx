// Header — sticky top bar with logo and new task button
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";

const Header = ({ showForm, onToggleForm }) => {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                {/* Logo + app name */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-white text-base font-bold">T</span>
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-slate-800 leading-tight">
                            TaskFlow
                        </h1>
                        <p className="text-xs text-slate-400 hidden sm:block">
                            Professional Task Manager
                        </p>
                    </div>
                </div>

                {/* New task button */}
                <button
                    onClick={onToggleForm}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all ${showForm
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                        }`}
                >
                    <span className="text-base font-bold leading-none">
                        {showForm ? <FiMinusCircle/> : <FaCirclePlus />}
                    </span>
                    <span>{showForm ? 'Cancel' : 'New Task'}</span>
                </button>
            </div>
        </header>
    )
}

export default Header