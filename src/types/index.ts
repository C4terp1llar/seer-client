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
    name: string;
    query: string;
    result: any;
    createdAt: Date;
}