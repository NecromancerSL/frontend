export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UserLogin {
    name: string;
    email: string;
    password: string;
}