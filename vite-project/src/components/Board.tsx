import { useState } from 'react';
import { useKanban } from '../hooks/useKanban';
import { Column } from './Column';
import { TaskModal } from './TaskModal';
import { Task, Status, BoardData } from '../types';

interface BoardProps {
    initialData?: BoardData;
}

export const Board = ({ initialData }: BoardProps) => {
    const { boardData, moveTask, updateTask, deleteTask, addTask } = useKanban(initialData);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // For creating new task
    const [isCreating, setIsCreating] = useState(false);
    const [createStatus, setCreateStatus] = useState<Status>('todo');

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsCreating(false);
        setIsModalOpen(true);
    };

    const handleCreateTask = (status: Status) => {
        setCreateStatus(status);
        setEditingTask(null);
        setIsCreating(true);
        setIsModalOpen(true);
    }

    const handleSave = (task: Task) => {
        if (isCreating) {
            addTask(task.title, task.description, createStatus);
        } else {
            updateTask(task);
        }
    };

    const handleDelete = (taskId: string) => {
        if (editingTask) {
            deleteTask(taskId, editingTask.status);
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Project Kanban
                </h1>
                <button
                    onClick={() => handleCreateTask('todo')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Task
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4 items-start h-full">
                <Column
                    id="todo"
                    title="To Do"
                    tasks={boardData.todo}
                    onTaskDrop={moveTask}
                    onEditTask={handleEditTask}
                />
                <Column
                    id="in-progress"
                    title="In Progress"
                    tasks={boardData['in-progress']}
                    onTaskDrop={moveTask}
                    onEditTask={handleEditTask}
                />
                <Column
                    id="done"
                    title="Done"
                    tasks={boardData.done}
                    onTaskDrop={moveTask}
                    onEditTask={handleEditTask}
                />
            </div>

            <TaskModal
                isOpen={isModalOpen}
                task={editingTask}
                isNew={isCreating}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
};
