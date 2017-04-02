import { IProject } from './project.interface';
import { IFeed } from './feed.interface';

export interface IState {

  projects: {
    [ id: string ] : {
      id: string,
      team: string,
      owner: string,
      
    }
  },
  feed: {
    [ id: string ] : {
      id: string,
      project: string,
      timestamp: string,
      action: string,
      user: string,

    }
  },
  users: {
    [ id: string ] : {
      id: string,
      name: string,
      email: string,
      timestamp: string,
      teams: string[],
      projects: string[],
      ideas: string[],
      comments: string[],
    }
  },
  ideas: {
    [ id: string ] : {
      id: string,
      owner: string,
      project: string,
      timestamp: number,
      text: string,
      stars: {
        count: string,
        users?: string[]
      },
      comments?: string[],

    }
  },
  comments: {
    [ id: string ] : {
      id: string,
      owner: string,
      idea: string,
      timestamp: number,
      text: string,
      replyTo?: string,
    }
  }

}
