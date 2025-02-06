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