export interface Notification {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    timeout: number;
}

export interface User {
    id: string;
    name: string;
    fullName: string;
    email: string;
    avatar: string;
    selectedProject: string | null;
    selectedTask: string | null;
}

export interface ProjectTitles {
    id: number;
    title: string;
}

export interface IssuesShortStats {
    total: number,
    in_work: number,
    accepted: number,
    to_do: number,
    errors: number
}

export interface JqlQuery {
    _id: string;
    user: string;
    name: string;
    query: string;
    result: any;
    fields: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type DashboardTab = 'queries' | 'widgets';

export interface WidgetNote {
    _id: string;
    user: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Event {
    _id: string;
    user: string;
    title: string;
    day: Date,
    time_from: string,
    time_to: string,
    description: string,
    color: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface HPIssue {
    total: number;
    isFirst: boolean;
    isLast: boolean;
    fields: any;
    baseURL: string;
    [key: string]: any;
}