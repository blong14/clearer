export interface IProject{
    id: string,
    name: string,
    description: string,
    goals: Array<object>,
    constraints: Array<object>,
    owner: string,
    phase: number,
    team?: Array<string>,
    ideas?: Array<string>
}
