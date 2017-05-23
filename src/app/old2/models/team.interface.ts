import { User } from './user.interface';
import { Project } from './project.interface';


export interface Team {

  members: Array<User>,
  admin: User
  projects: Array<Project>

}
