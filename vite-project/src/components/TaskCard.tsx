import { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onDragStart: (e: React.DragEvent, task: Task) => void;
    onClick: (task: Task) => void;
}

export const TaskCard = ({ task, onDragStart, onClick }: TaskCardProps) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onClick={() => onClick(task)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 hover:-translate-y-1 mb-3"
        >
            <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-2">{task.description}</p>
            <div className="mt-3 flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'todo' ? 'bg-blue-100 text-blue-700' :
                        task.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                    }`}>
                    {task.status.replace('-', ' ')}
                </span>
            </div>
        </div>
    );
};
