import { useState, useCallback } from 'react';
import { BoardData, Status, Task } from '../types';

const INITIAL_DATA: BoardData = {
    'todo': [
        { id: '1', title: 'Research competitors', description: 'Analyze top 3 competitors features', status: 'todo' },
        { id: '2', title: 'Draft project plan', description: 'Include milestones and timeline', status: 'todo' },
    ],
    'in-progress': [
        { id: '3', title: 'Design system', description: 'Create color palette and typography', status: 'in-progress' },
    ],
    'done': [
        { id: '4', title: 'Setup repo', description: 'Initialize git and install dependencies', status: 'done' },
    ]
};

export const useKanban = () => {
    const [boardData, setBoardData] = useState<BoardData>(INITIAL_DATA);

    const moveTask = useCallback((taskId: string, sourceStatus: Status, destStatus: Status, destIndex: number) => {
        setBoardData((prev) => {
            const newBoard = { ...prev };
            const sourceList = [...newBoard[sourceStatus]];
            const destList = sourceStatus === destStatus ? sourceList : [...newBoard[destStatus]];

            const taskIndex = sourceList.findIndex(t => t.id === taskId);
            if (taskIndex === -1) return prev;

            const [movedTask] = sourceList.splice(taskIndex, 1);

            // Update status if moved to different column
            if (sourceStatus !== destStatus) {
                movedTask.status = destStatus;
            }

            destList.splice(destIndex, 0, movedTask);

            return {
                ...prev,
                [sourceStatus]: sourceList,
                [destStatus]: destList,
            };
        });
    }, []);

    const updateTask = useCallback((updatedTask: Task) => {
        setBoardData((prev) => {
            const column = [...prev[updatedTask.status]];
            const index = column.findIndex(t => t.id === updatedTask.id);
            if (index === -1) return prev;

            column[index] = updatedTask;
            return {
                ...prev,
                [updatedTask.status]: column
            };
        });
    }, []);

    const deleteTask = useCallback((taskId: string, status: Status) => {
        setBoardData((prev) => {
            const column = prev[status].filter(t => t.id !== taskId);
            return {
                ...prev,
                [status]: column
            }
        })
    }, []);

    const addTask = useCallback((title: string, description: string, status: Status) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            status
        };
        setBoardData(prev => ({
            ...prev,
            [status]: [...prev[status], newTask]
        }));
    }, []);

    return { boardData, moveTask, updateTask, deleteTask, addTask };
};
