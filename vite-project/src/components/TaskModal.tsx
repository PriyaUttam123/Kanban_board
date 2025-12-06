import { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskModalProps {
    isOpen: boolean;
    task: Task | null;
    onClose: () => void;
    onSave: (task: Task) => void;
    onDelete: (taskId: string) => void;
    isNew?: boolean;
}

export const TaskModal = ({ isOpen, task, onClose, onSave, onDelete, isNew = false }: TaskModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!task && !isNew) return;

        // Construct the task object to save
        // If new, we need to construct a partial task or let parent handle ID gen.
        // Here we'll just pass the updated fields and let parent merge or create.

        // For simplicity, we assume we are editing strictly or creating.
        // If editing, we pass the full task with updates.
        if (task) {
            onSave({ ...task, title, description });
        } else {
            // Handle new task logic if needed, but for now we focus on Edit as per initial requirement
            // But to support "Create", we would need to pass status.
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all animate-scale-in">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isNew ? 'Create Task' : 'Edit Task'}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="Task title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[120px]"
                                    placeholder="Task details..."
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-3">
                            {!isNew && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (task) onDelete(task.id);
                                        onClose();
                                    }}
                                    className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
