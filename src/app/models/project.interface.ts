import { User } from './user.interface';
import { Idea } from './idea.interface';
import { Team } from './team.interface';
import { Brief } from './brief.interface';

export interface Project{
    id: string,
    name: string,
    description: string,
    brief: Brief,
    owner: User,
    team?: Team,
    collaborators?: Array<User>,
    state: number,
    ideas?: Array<Idea>
}
