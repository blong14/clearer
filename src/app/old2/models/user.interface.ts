export interface User {
    uid: string,
    name?: string,
    email?: string,
    username?: string,
    password?: string,
    teams?: Array<number>
}
