interface IFeed {
  action: string;
  project: {
    id: string
  },
  timestamp: number,
  type: string;
  user: {
    uid: string
  }
}

export class Feed implements IFeed {

  action: string;
  project: {
    id: string
  };
  timestamp: number;
  type: string;
  user: {
    uid: string
  };

  constructor(){}

}
