import type { Meta, StoryObj } from '@storybook/react';
import { Board } from './Board';
import { BoardData } from '../types';

const meta = {
    title: 'Kanban/Board',
    component: Board,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default view
export const Default: Story = {};

// Empty view
const emptyData: BoardData = {
    'todo': [],
    'in-progress': [],
    'done': []
};

export const Empty: Story = {
    args: {
        initialData: emptyData,
    },
};

// Large Data view
const largeData: BoardData = {
    'todo': Array.from({ length: 20 }, (_, i) => ({
        id: `todo-${i}`,
        title: `Task Todo ${i + 1}`,
        description: 'This is many tasks to show scrolling behavior.',
        status: 'todo'
    })),
    'in-progress': Array.from({ length: 10 }, (_, i) => ({
        id: `inp-${i}`,
        title: `In Progress ${i + 1}`,
        description: 'Working on this.',
        status: 'in-progress'
    })),
    'done': Array.from({ length: 50 }, (_, i) => ({
        id: `done-${i}`,
        title: `Done Task ${i + 1}`,
        description: 'Completed long ago.',
        status: 'done'
    }))
};

export const LargeData: Story = {
    args: {
        initialData: largeData,
    },
};

// Mobile View
export const Mobile: Story = {
    args: {
        initialData: largeData
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
