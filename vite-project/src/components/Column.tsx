import React from 'react';
import { Task, Status } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
    id: Status;
    title: string;
    tasks: Task[];
    onTaskDrop: (taskId: string, sourceStatus: Status, destStatus: Status, index: number) => void;
    onEditTask: (task: Task) => void;
}

export const Column = ({ id, title, tasks, onTaskDrop, onEditTask }: ColumnProps) => {
    const handleDragStart = (e: React.DragEvent, task: Task) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('sourceStatus', task.status);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        const sourceStatus = e.dataTransfer.getData('sourceStatus') as Status;

        if (!taskId || !sourceStatus) return;

        // Calculate drop index
        const dropTarget = (e.target as HTMLElement).closest('[data-task-index]');
        let index = tasks.length; // Default to end

        if (dropTarget) {
            const targetIndex = parseInt(dropTarget.getAttribute('data-task-index') || '0', 10);
            // Determine if dropping before or after the target based on Y position (optional refinement)
            // For now, let's insert BEFORE the target
            index = targetIndex;
        }

        onTaskDrop(taskId, sourceStatus, id, index);
    };

    return (
        <div
            className="flex flex-col bg-gray-50 rounded-xl min-w-[300px] w-full md:w-1/3 min-h-[500px]"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-xl sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-gray-700">{title}</h2>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {tasks.length}
                    </span>
                </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {tasks.map((task, index) => (
                    <div key={task.id} data-task-index={index}>
                        <TaskCard
                            task={task}
                            onDragStart={handleDragStart}
                            onClick={onEditTask}
                        />
                    </div>
                ))}
                {tasks.length === 0 && (
                    <div className="h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                        Drop items here
                    </div>
                )}
            </div>
        </div>
    );
};
