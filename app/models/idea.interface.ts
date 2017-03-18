export interface Idea {
    text: string,
    owner: {
        email: string,
        name: string,
        uid: string
    },
    questions: Array<object>,
    state: number,
    champion: {
        name: string,
        email: string,
        uid: string
    },
    timestamp: number,
    votes: {
        count: number,
        voters: Array<string>
    }


}