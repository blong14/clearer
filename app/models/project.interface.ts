export interface Project{
    id: string,
    name: string,
    description: string,
    goals: Object,
    owner: {
        email: string,
        uid: string
    },
    team: string,
}