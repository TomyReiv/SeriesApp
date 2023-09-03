export interface loginResponse{
    user: User,
    token: string
}

export interface User {
    id: number,
    name: string,
    password: string,
    email: string
}