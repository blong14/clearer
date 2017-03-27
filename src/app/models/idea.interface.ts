import { User } from './user.interface';

interface Comment {
  author: User,
  text: string
}

interface Question {
  text: string,
  comments: Array<Comment>
}


export interface Idea {
    text: string,
    owner: User,
    state: number,
    timestamp: number,
    stars?: {
        count: number,
        people: Array<string>
    },
    champion?: User,
    comments?: Array<Comment>,
    questions?: Array<Question>
}
